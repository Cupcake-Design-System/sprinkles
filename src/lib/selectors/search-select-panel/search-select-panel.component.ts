import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  TemplateRef,
  HostBinding
} from '@angular/core';
import { Observable, EMPTY, Subject, BehaviorSubject, combineLatest, of, timer } from 'rxjs';
import { IListItem, IListSearchResult, IListChangedEvent, IFocusParams, ControlSide, IMoveFocusParams } from '../types';
import { takeUntilDestroy } from '../../utilities/take-until-destroy';
import { CupcakeSizes } from '../../common';
import { map, publishReplay, refCount, debounce, distinctUntilChanged } from 'rxjs/operators';
import { differenceBy } from 'lodash';

export const noResultsMessageDefault = 'No results found';
export const tooManyResultsMessageDefault = 'Too many results found';
export const searchPlaceholderDefault = 'Search';

const selectAllId = '55756375-9a7d-492b-b24b-18aa1a00677a';

@Component({
  selector: 'spr-search-select-panel',
  templateUrl: './search-select-panel.component.html',
  styleUrls: ['./search-select-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSelectPanelComponent implements OnInit, OnDestroy {

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly element: ElementRef<HTMLElement>) { }

  @Input()
  public selectedItems$: Observable<IListItem[]>;
  @Input()
  public searchResult$: Observable<IListSearchResult>;
  @Input()
  public search$: Observable<string> = EMPTY;
  @Input()
  public focus$: Observable<IFocusParams> = EMPTY;
  @Input()
  public itemTemplate: TemplateRef<any>;
  @Input()
  public noResultsMessage = noResultsMessageDefault;
  @Input()
  public tooManyResultsMessage = tooManyResultsMessageDefault;
  @Input()
  public searchPlaceholder = searchPlaceholderDefault;
  @Input()
  public size: CupcakeSizes = CupcakeSizes.sm;
  @Input()
  public showSearch = true;
  @Input()
  public highlightSearchFocus = true;
  @Input()
  public addSelectAll = false;
  @Input()
  public localFilter: ((items: IListItem[], search: string) => IListItem[]) | 'default' = 'default';
  @Input()
  public searchDebounceTimeMs: number | null = 300;

  @Input()
  @HostBinding('tabindex')
  public tabindex = -1;

  @Output()
  public searchChanged = new EventEmitter<string>();
  @Output()
  public selectionChanged = new EventEmitter<IListChangedEvent>();
  @Output()
  public moveFocus = new EventEmitter<IMoveFocusParams>();

  @ViewChild('searchInput')
  public searchInputRef: ElementRef<HTMLInputElement>;

  public filteredItems$: Observable<IListItem[]>;
  public filteredSearchResult$: Observable<IListSearchResult>;
  public displayedSelectedItems$: Observable<IListItem[]>;
  public readonly toggleCurrent$ = new Subject<void>();
  public readonly moveUp$ = new Subject<void>();
  public readonly moveDown$ = new Subject<void>();
  public readonly moveTop$ = new Subject<void>();
  public readonly moveBottom$ = new Subject<void>();
  public readonly innerSearch$ = new BehaviorSubject('');

  private readonly innerSelectedItems$ = new BehaviorSubject<IListItem[]>([]);
  private readonly searchInput$ = new Subject<string>();

  public isFocused = false;

  private searchResultItems: IListItem[] = [];

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = e.which || e.keyCode;

    if (key === 38) {
      this.moveUp$.next();
    } else if (key === 40) {
      this.moveDown$.next();
    } else if (key === 13) {
      this.toggleCurrent$.next();
    }
  }

  @HostListener('focusin', ['$event'])
  public onFocusIn(e: FocusEvent) {
    this.isFocused = true;

    const focusHolder = this.getFocusHolder();

    if (e.target !== focusHolder) {
      focusHolder.focus();
    }
  }

  @HostListener('focusout')
  public onFocusOut() {
    this.isFocused = false;
  }

  public ngOnInit() {
    this.selectedItems$.pipe(
      takeUntilDestroy(this)
    ).subscribe(selectedItems => {
      this.innerSelectedItems$.next(selectedItems);
    });

    // pls don't replace with shareReplay: https://blog.strongbrew.io/share-replay-issue/
    const sharedSearchResult$ = this.searchResult$.pipe(takeUntilDestroy(this), publishReplay(1), refCount());

    sharedSearchResult$.subscribe(searchResult => this.searchResultItems = searchResult.items);

    this.filteredSearchResult$ = combineLatest(sharedSearchResult$, this.innerSearch$).pipe(
      map(([searchResult, search]) => {
        const localFilter =
          this.localFilter === 'default' ? defaultFilter :
            this.localFilter == null ? nopFilter :
              this.localFilter;

        const filteredItems = localFilter(searchResult.items, search);

        if (this.addSelectAll && searchResult.items.length > 0) {
          filteredItems.unshift(this.createSelectAllItem());
        }

        return {
          isLoading: searchResult.isLoading,
          isTooManyResults: searchResult.isTooManyResults,
          items: filteredItems
        };
      })
    );

    this.displayedSelectedItems$ = combineLatest(sharedSearchResult$, this.innerSelectedItems$).pipe(
      map(([searchResult, selectedItems]) => {
        return this.enrichInnerSelection(selectedItems, searchResult.items);
      })
    );

    this.search$.pipe(
      takeUntilDestroy(this)
    ).subscribe(search => {
      this.innerSearch$.next(search);
    });

    this.focus$.pipe(
      takeUntilDestroy(this)
    ).subscribe((params: IFocusParams) => {
      this.getFocusHolder().focus();

      switch (params.to) {
        case ControlSide.Bottom:
          this.moveBottom$.next();
          break;
        default:
          this.moveTop$.next();
          break;
      }

      this.changeDetector.markForCheck();
    });

    this.searchInput$.pipe(
      debounce(() => this.searchDebounceTimeMs != null ? timer(this.searchDebounceTimeMs) : EMPTY)
    ).subscribe(newSearch => {
      newSearch = newSearch || '';
      if (newSearch === this.innerSearch$.value) {
        return;
      }

      this.innerSearch$.next(newSearch);
      this.searchChanged.emit(newSearch);
    });
  }

  public ngOnDestroy() {
    this.toggleCurrent$.complete();
    this.moveUp$.complete();
    this.moveDown$.complete();
    this.moveTop$.complete();
    this.moveBottom$.complete();
    this.innerSearch$.complete();
    this.innerSelectedItems$.complete();
    this.searchInput$.complete();
  }

  public onSearchChange(newSearch: string | null | undefined) {
    this.searchInput$.next(newSearch);
  }

  public onSelectionChange(e: IListChangedEvent) {
    if (e.added.some(item => item.isSelectAll)) {
      this.selectAll();
    } else if (e.removed.some(item => item.isSelectAll)) {
      this.unselectAll();
    } else {
      e = this.withoutSelectAll(e);
      this.innerSelectedItems$.next(e.allSelected);
      this.selectionChanged.emit(e);
    }
  }

  private selectAll() {
    const originallySelected = this.innerSelectedItems$.value;
    const added = differenceBy(this.searchResultItems, originallySelected, item => item.id).filter(item => !item.isSelectAll);
    this.innerSelectedItems$.next(this.searchResultItems);
    this.selectionChanged.emit(this.withoutSelectAll({
      added,
      allSelected: [...originallySelected, ...added],
      removed: []
    }));
  }

  private unselectAll() {
    const removed = this.innerSelectedItems$.value;
    this.innerSelectedItems$.next([]);
    this.selectionChanged.emit(this.withoutSelectAll({
      added: [],
      allSelected: [],
      removed
    }));
  }

  private getFocusHolder(): HTMLElement {
    if (this.searchInputRef != null) {
      return this.searchInputRef.nativeElement;
    } else {
      return this.element.nativeElement;
    }
  }

  private withoutSelectAll(e: IListChangedEvent) {
    return {
      added: e.added.filter(item => !item.isSelectAll),
      removed: e.removed.filter(item => !item.isSelectAll),
      allSelected: e.allSelected.filter(item => !item.isSelectAll)
    };
  }

  private createSelectAllItem(): IListItem {
    return {
      id: selectAllId,
      text: 'Select All',
      isSelectAll: true
    };
  }

  private enrichInnerSelection(selection: IListItem[], allItems: IListItem[]): IListItem[] {
    if (!this.addSelectAll) {
      return selection;
    }

    const allItemsSelected = this.allItemsSelected(selection, allItems);

    if (allItemsSelected) {
      selection = [this.createSelectAllItem(), ...selection];
    }

    return selection;
  }

  private allItemsSelected(selectedItems: IListItem[], allItems: IListItem[]): boolean {
    return differenceBy(allItems, selectedItems, item => item.id).length === 0;
  }
}

function defaultFilter(items: IListItem[], search: string): IListItem[] {
  search = (search || '').toLowerCase();
  return items.filter(item => (item.text || '').toLowerCase().indexOf(search) !== -1);
}

function nopFilter(items: IListItem[]): IListItem[] {
  return [...items];
}
