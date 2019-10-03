import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  HostBinding
} from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { IListItem, IListChangedEvent, IFocusParams, IMoveFocusParams, ControlSide } from '../../selectors/types';
import { takeUntilDestroy } from '../../utilities/take-until-destroy';

const fastdom = require('fastdom');

export const noItemsSelectedMessageDefault = 'No items selected';

@Component({
  selector: 'spr-pill-block',
  templateUrl: './pill-block.component.html',
  styleUrls: ['./pill-block-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PillBlockComponent implements OnInit, OnDestroy {
  @Input()
  public items$: Observable<IListItem[]>;
  @Input()
  public focus$: Observable<IFocusParams> = EMPTY;
  @Input()
  public noItemsMessage = noItemsSelectedMessageDefault;
  @Input()
  @HostBinding('tabindex')
  public tabindex = -1;
  @Input()
  public set maxPillWidthPx(value: number | null) {
    if (value == null) {
      this.maxPillWidth = undefined;
    } else {
      this.maxPillWidth = `${value}px`;
    }
  }

  @Output()
  public itemsChanged = new EventEmitter<IListChangedEvent>();
  @Output()
  public moveFocus = new EventEmitter<IMoveFocusParams>();

  @ViewChildren('itemElement')
  public itemElements: QueryList<ElementRef<HTMLElement>>;

  public items: IListItem[] = [];
  public maxPillWidth: string | undefined = undefined;

  private currentItemIndex: number | null = null;

  @HostListener('focus')
  public onFocus() {
    if (this.items.length === 0) {
      this.moveFocus.emit({ from: null });
    }

    if (this.currentItemIndex == null || this.currentItemIndex < 0 || this.currentItemIndex >= this.items.length) {
      this.setCurrentItem(0);
    } else {
      this.focusCurrentItem();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = e.which || e.keyCode;

    switch (key) {
      case 37:
        this.moveCurrentLeft();
        break;
      case 38:
        this.moveCurrentUp();
        break;
      case 39:
        this.moveCurrentRight();
        break;
      case 40:
        this.moveCurrentDown();
        break;
      case 8:
      case 46:
        this.removeCurrentItem();
        break;
      default:
        return;
    }
  }

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  public itemsTrackFn = (i: number) => {
    return this.items[i].id;
  }

  public ngOnInit() {
    this.items$.pipe(takeUntilDestroy(this)).subscribe(items => {
      if (items != null) {
        this.items = [...items];
      } else {
        this.items = [];
      }

      this.changeDetector.markForCheck();
    });

    this.focus$.pipe(takeUntilDestroy(this)).subscribe(params => {
      if (this.items.length === 0) {
        const moveSide = params.to === ControlSide.Top ? ControlSide.Bottom : ControlSide.Top;
        this.moveFocus.emit({ from: moveSide });
        return;
      }

      switch (params.to) {
        case ControlSide.Bottom:
          this.setCurrentItem(this.items.length - 1);
          break;
        default:
          this.setCurrentItem(0);
          break;
      }

      this.changeDetector.markForCheck();
    });
  }

  public removeItem(toRemove: IListItem) {
    const itemIndex = this.getItemIndex(toRemove);

    if (itemIndex == null) {
      return;
    }

    const isCurrentItemRemoved = itemIndex === this.currentItemIndex;

    this.items = this.items.filter(item => item.id !== toRemove.id);
    this.itemsChanged.emit({
      added: [],
      removed: [toRemove],
      allSelected: [...this.items]
    });

    if (isCurrentItemRemoved) {
      setTimeout(() => {
        if (this.items.length === 0) {
          this.moveFocus.emit({ from: null });
        } else if (this.currentItemIndex > 0) {
          this.setCurrentItem(this.currentItemIndex - 1);
        } else {
          this.setCurrentItem(0);
        }
      });
    }
  }

  public onItemFocus(item: IListItem) {
    this.currentItemIndex = this.getItemIndex(item);
  }

  public ngOnDestroy() { }

  private getItemIndex(item: IListItem): number | null {
    const index = this.items.indexOf(item);
    if (index === -1) {
      return null;
    }
    return index;
  }

  private moveCurrentLeft() {
    if (this.currentItemIndex == null) {
      return;
    }
    const newIndex = this.currentItemIndex - 1;

    if (newIndex < 0) {
      this.moveFocus.emit({ from: ControlSide.Top });
      return;
    }

    this.setCurrentItem(newIndex);
  }

  private moveCurrentUp() {
    if (this.currentItemIndex == null) {
      return;
    }

    fastdom.measure(() => {
      const rects = this.itemElements.map(el => {
        return el.nativeElement.getBoundingClientRect();
      });

      setTimeout(() => {
        const aboveIndex = this.getItemIndexAbove(this.currentItemIndex, rects);

        if (aboveIndex != null) {
          this.setCurrentItem(aboveIndex);
        } else {
          this.moveFocus.emit({ from: ControlSide.Top });
        }
      });
    });
  }

  private moveCurrentRight() {
    if (this.currentItemIndex == null) {
      return;
    }

    const newIndex = this.currentItemIndex + 1;
    if (newIndex >= this.items.length) {
      this.moveFocus.emit({ from: ControlSide.Bottom });
      return;
    }

    this.setCurrentItem(newIndex);
  }

  private moveCurrentDown() {
    if (this.currentItemIndex == null) {
      return;
    }

    fastdom.measure(() => {
      const rects = this.itemElements.map(el => {
        return el.nativeElement.getBoundingClientRect();
      });

      setTimeout(() => {
        const belowIndex = this.getItemIndexBelow(this.currentItemIndex, rects);

        if (belowIndex != null) {
          this.setCurrentItem(belowIndex);
        } else {
          this.moveFocus.emit({ from: ControlSide.Bottom });
        }
      });
    });
  }

  private removeCurrentItem() {
    if (this.currentItemIndex == null) {
      return;
    }

    this.removeItem(this.items[this.currentItemIndex]);
  }

  private setCurrentItem(index: number) {
    if (index < 0 || index >= this.items.length || index >= this.itemElements.length) {
      return;
    }

    this.currentItemIndex = index;
    this.focusCurrentItem();
  }

  private focusCurrentItem() {
    const currentItemElement = this.itemElements.find((_item, itemIndex) => itemIndex === this.currentItemIndex);
    currentItemElement.nativeElement.focus();
  }

  private getItemIndexAbove(currentIndex: number, rects: ClientRect[]): number | null {
    let aboveIndex = null;
    const currentRect = rects[currentIndex];

    for (let i = 0; i < currentIndex; i++) {
      if (rects[i].bottom >= currentRect.top) {
        continue;
      }

      if (aboveIndex == null
        || rects[i].bottom > rects[aboveIndex].bottom
        || (
          rects[i].bottom === rects[aboveIndex].bottom
          && Math.abs(rects[i].left - currentRect.left) < Math.abs(rects[aboveIndex].left - currentRect.left)
        )
      ) {
        aboveIndex = i;
      }
    }

    return aboveIndex;
  }

  private getItemIndexBelow(currentIndex: number, rects: ClientRect[]): number | null {
    let belowIndex = null;
    const currentRect = rects[currentIndex];

    for (let i = rects.length - 1; i > currentIndex; i--) {
      if (rects[i].top <= currentRect.bottom) {
        continue;
      }

      if (belowIndex == null
        || rects[i].top < rects[belowIndex].top
        || (
          rects[i].top === rects[belowIndex].top
          && Math.abs(rects[i].left - currentRect.left) < Math.abs(rects[belowIndex].left - currentRect.left)
        )
      ) {
        belowIndex = i;
      }
    }

    return belowIndex;
  }
}
