import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  QueryList,
  ContentChildren,
  AfterContentInit,
  TemplateRef,
  HostBinding,
  HostListener
} from '@angular/core';
import { IListItem, IListSearchResult, IListChangedEvent, IListAction, IFocusParams, IMoveFocusParams, ControlSide } from '../types';
import { Observable, BehaviorSubject, Subject, EMPTY } from 'rxjs';
import { takeUntilDestroy } from '../../utilities/take-until-destroy';
import { TemplateDirective } from '../../common/directives/template.directive';
import { CupcakeSizes } from '../../common';
import { noResultsMessageDefault, tooManyResultsMessageDefault, searchPlaceholderDefault } from '../search-select-panel/search-select-panel.component';
import { noItemsSelectedMessageDefault } from '../../pills/pill-block/pill-block.component';

@Component({
  selector: 'spr-rich-multiselect-panel',
  templateUrl: './rich-multiselect-panel.component.html',
  styleUrls: ['./rich-multiselect-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RichMultiselectPanelComponent implements OnInit, AfterContentInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('selectedItems$')
  public externalSelectedItems$: Observable<IListItem[]> = EMPTY;
  @Input()
  public searchResult$: Observable<IListSearchResult>;
  @Input()
  public action$: Observable<IListAction | null> = EMPTY;
  @Input()
  public search$: Observable<string> = EMPTY;
  @Input()
  public selectorHeight = '150px';
  @Input()
  public noResultsMessage = noResultsMessageDefault;
  @Input()
  public tooManyResultsMessage = tooManyResultsMessageDefault;
  @Input()
  public noItemsSelectedMessage = noItemsSelectedMessageDefault;
  @Input()
  public searchPlaceholder = searchPlaceholderDefault;
  @Input()
  public size: CupcakeSizes = CupcakeSizes.sm;
  @Input()
  @HostBinding('tabindex')
  public tabindex = -1;
  @Input()
  public maxPillWidthPx: number | null = null;
  @Input()
  public addSelectAll = false;
  @Input()
  public localFilter: ((items: IListItem[], search: string) => IListItem[]) | 'default' = 'default';
  @Input()
  public searchDebounceTimeMs: number | null = 300;

  @Output()
  public searchChanged = new EventEmitter<string>();
  @Output()
  public selectionChanged = new EventEmitter<IListChangedEvent>();

  @ContentChildren(TemplateDirective)
  public templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;
  public readonly selectedItems$ = new BehaviorSubject<IListItem[]>([]);
  public readonly focusSelector$ = new Subject<IFocusParams>();
  public readonly focusActionPanel$ = new Subject<IFocusParams>();
  public readonly focusPills$ = new Subject<IFocusParams>();

  @HostListener('focus')
  public onFocus() {
    this.focusPills$.next({ to: ControlSide.Top });
  }

  public ngOnInit() {
    this.externalSelectedItems$
      .pipe(
        takeUntilDestroy(this)
      )
      .subscribe(selectedItems => this.selectedItems$.next(selectedItems));
  }

  public ngAfterContentInit() {
    if (this.templates == null) {
      return;
    }

    this.templates.forEach(t => {
      switch (t.name) {
        case 'itemTemplate':
          this.itemTemplate = t.template;
          break;
        default:
          break;
      }
    });
  }

  public onSearchChanged(newSearch: string) {
    this.searchChanged.emit(newSearch);
  }

  public onSelectionChanged(evt: IListChangedEvent) {
    this.selectedItems$.next(evt.allSelected);
    this.selectionChanged.emit(evt);
  }

  public onMovePillsFocus($event: IMoveFocusParams) {
    if ($event.from === ControlSide.Bottom || $event.from == null) {
      setTimeout(() => {
        this.focusSelector$.next({ to: ControlSide.Top });
      });
    }
  }

  public onMoveSelectorFocus($event: IMoveFocusParams) {
    setTimeout(() => {
      if ($event.from === ControlSide.Bottom) {
        this.focusActionPanel$.next({ to: ControlSide.Top });
      } else if ($event.from === ControlSide.Top) {
        this.focusPills$.next({ to: ControlSide.Bottom });
      }
    });
  }

  public onMoveActionPanelFocus($event: IMoveFocusParams) {
    if ($event.from === ControlSide.Top) {
      setTimeout(() => {
        this.focusSelector$.next({ to: ControlSide.Bottom });
      });
    }
  }

  public ngOnDestroy() {
    this.selectedItems$.complete();
    this.focusSelector$.complete();
    this.focusActionPanel$.complete();
    this.focusPills$.complete();
  }
}
