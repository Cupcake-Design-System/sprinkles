import { Component, ChangeDetectionStrategy, Input, TemplateRef, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, QueryList, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { IListItem, IListChangedEvent, IMoveFocusParams, ControlSide, IListSearchResult } from '../../types';
import { Observable } from 'rxjs';
import { takeUntilDestroy } from '../../../utilities/take-until-destroy';
import { CupcakeSizes } from '../../../common';

@Component({
  selector: 'spr-select-panel-items',
  templateUrl: './select-panel-items.component.html',
  styleUrls: ['./select-panel-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPanelItemsComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems$: Observable<IListItem[]>;
  @Input()
  searchResult$: Observable<IListSearchResult>;
  @Input()
  public itemTemplate: TemplateRef<any>;
  @Input()
  public toggleCurrent$: Observable<void>;
  @Input()
  public moveUp$: Observable<void>;
  @Input()
  public moveDown$: Observable<void>;
  @Input()
  public moveTop$: Observable<void>;
  @Input()
  public moveBottom$: Observable<void>;
  @Input()
  public size: CupcakeSizes = CupcakeSizes.sm;
  @Input()
  public noResultsMessage: string;
  @Input()
  public tooManyResultsMessage: string;

  @Output()
  public selectionChanged = new EventEmitter<IListChangedEvent>();
  @Output()
  public moveFocus = new EventEmitter<IMoveFocusParams>();

  @ViewChild('itemParent')
  public itemParent: ElementRef<HTMLElement>;
  @ViewChildren('selectableItem')
  public selectableItems: QueryList<ElementRef<HTMLElement>>;

  public wrappedItems: IItemWrapper[] = [];
  public isLoading = false;
  public isEmpty = false;
  public isTooManyResults = false;

  private currentItemId: string | null = null;
  private readonly selectedItemMap = new Map<string, IListItem>();

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.selectedItems$.pipe(
      takeUntilDestroy(this)
    ).subscribe(selectedItems => {
      this.selectedItemMap.clear();
      selectedItems.forEach(item => this.selectedItemMap.set(item.id, item));
      this.calculateSelection();

      this.changeDetector.markForCheck();
    });

    this.searchResult$.pipe(
      takeUntilDestroy(this)
    ).subscribe(searchResult => {
      this.isLoading = searchResult.isLoading;
      this.isTooManyResults = searchResult.isTooManyResults;
      this.isEmpty = searchResult.items.length === 0 && !searchResult.isLoading && !searchResult.isTooManyResults;

      this.wrappedItems = searchResult.items.map(item => ({
        item,
        isCurrent: item.id === this.currentItemId,
        isSelected: false
      }));

      if (!this.wrappedItems.some(i => i.isCurrent)) {
        this.moveCurrentTop();
      } else {
        setTimeout(() => {
          this.scrollToCurrentItem();
        });
      }

      this.calculateSelection();

      this.changeDetector.markForCheck();
    });

    this.toggleCurrent$.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.toggleCurrentItem();
      this.changeDetector.markForCheck();
    });

    this.moveUp$.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.moveCurrentUp();
      this.changeDetector.markForCheck();
    });

    this.moveDown$.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.moveCurrentDown();
      this.changeDetector.markForCheck();
    });

    this.moveTop$.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.moveCurrentTop();
      this.changeDetector.markForCheck();
    });

    this.moveBottom$.pipe(
      takeUntilDestroy(this)
    ).subscribe(() => {
      this.moveCurrentBottom();
      this.changeDetector.markForCheck();
    });
  }

  public onSelectionChange(item: IItemWrapper, isSelected: boolean) {
    this.setItemSelected(item, isSelected);
    this.setCurrentItem(item.item.id);
  }

  public ngOnDestroy() { }

  public trackItems(_index: number, item: IItemWrapper) {
    return item.item.id;
  }

  private toggleCurrentItem() {
    if (this.currentItemId == null) {
      return;
    }

    const currentItem = this.wrappedItems.find(item => item.item.id === this.currentItemId);
    if (currentItem == null) {
      return;
    }

    this.setItemSelected(currentItem, !currentItem.isSelected);
  }

  private setItemSelected(item: IItemWrapper, isSelected: boolean) {
    if (isSelected === this.selectedItemMap.has(item.item.id)) {
      return;
    }

    if (isSelected) {
      this.selectedItemMap.set(item.item.id, item.item);
    } else {
      this.selectedItemMap.delete(item.item.id);
    }
    this.calculateSelection();

    this.selectionChanged.emit({
      added: isSelected ? [item.item] : [],
      removed: isSelected ? [] : [item.item],
      allSelected: Array.from(this.selectedItemMap.values())
    });
  }

  private calculateSelection() {
    this.wrappedItems.forEach(item => {
      item.isSelected = this.selectedItemMap.has(item.item.id);
    });
  }

  private moveCurrentUp() {
    this.moveItem(index => {
      if (index == null) {
        return -1;
      }

      return index - 1;
    });
  }

  private moveCurrentDown() {
    this.moveItem(index => {
      if (index != null) {
        return index + 1;
      }

      if (this.wrappedItems.length > 0) {
        return 0;
      }

      return Number.MAX_SAFE_INTEGER;
    });
  }

  private moveItem(getNextIndex: (index: number | null) => number) {
    const currentItemIndex = this.getCurrentItemIndex();

    const nextItemIndex = getNextIndex(currentItemIndex);
    if (nextItemIndex < 0) {
      this.moveFocus.emit({ from: ControlSide.Top });
    } else if (nextItemIndex >= this.wrappedItems.length) {
      this.moveFocus.emit({ from: ControlSide.Bottom });
    } else {
      this.setCurrentItem(this.wrappedItems[nextItemIndex].item.id);
    }
  }

  private moveCurrentTop() {
    if (this.wrappedItems.length === 0) {
      return;
    }

    this.setCurrentItem(this.wrappedItems[0].item.id);
  }

  private moveCurrentBottom() {
    if (this.wrappedItems.length === 0) {
      return;
    }

    this.setCurrentItem(this.wrappedItems[this.wrappedItems.length - 1].item.id);
  }

  private setCurrentItem(itemId: string) {
    this.currentItemId = itemId;
    for (const item of this.wrappedItems) {
      item.isCurrent = item.item.id === this.currentItemId;
    }
    setTimeout(() => {
      this.scrollToCurrentItem();
    });
  }

  private scrollToCurrentItem() {
    if (this.currentItemId == null) {
      return;
    }

    const currentItemIndex = this.getCurrentItemIndex();

    if (currentItemIndex == null || this.selectableItems == null || this.itemParent == null) {
      return;
    }

    const elementRef = this.selectableItems.find((_item, i) => i === currentItemIndex);

    if (elementRef == null) {
      return;
    }

    const element = elementRef.nativeElement;
    const parent = this.itemParent.nativeElement;

    if (element == null || parent == null) {
      return;
    }

    if (element.offsetTop < parent.scrollTop) {
      parent.scrollTop = element.offsetTop;
      return;
    }

    if (element.offsetTop + element.clientHeight >= parent.scrollTop + parent.clientHeight) {
      parent.scrollTop = element.offsetTop + element.clientHeight - parent.offsetHeight;
    }
  }

  private getCurrentItemIndex(): number | null {
    if (this.currentItemId == null) {
      return null;
    }
    return this.wrappedItems.findIndex(item => item.item.id === this.currentItemId);
  }
}

interface IItemWrapper {
  item: IListItem;
  isCurrent: boolean;
  isSelected: boolean;
}
