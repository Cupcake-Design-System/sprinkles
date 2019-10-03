import * as _ from 'lodash';
import { Directive, OnDestroy, ElementRef, NgZone, HostListener } from '@angular/core';
import { getElementPageY } from '../../utilities/get-element-page-y';

type relativePos = 'above' | 'below' | 'inside';
const mouseTrackingInterval = 50;
const scrollStepPx = 15;

@Directive({
  selector: '[sprScrollOnDrag]'
})
export class ScrollOnDragDirective implements OnDestroy {
  private isTracking = false;
  private mousePageY: number | null = null;
  private intervalId: any;

  @HostListener('dragstart')
  public onDragStart() {
    this.startTrackingMouse();
  }

  @HostListener('dragend')
  public onDragEnd() {
    this.stopTrackingMouse();
  }

  constructor(private readonly zone: NgZone, private readonly parent: ElementRef) {}

  public ngOnDestroy() {
    if (this.isTracking) this.stopTrackingMouse();
  }

  private startTrackingMouse() {
    const canScroll = this.canParentScroll();
    if (this.isTracking || !canScroll) {
      return;
    }

    this.isTracking = true;
    this.zone.runOutsideAngular(() => {
      document.addEventListener('drag', this.onDrag, false);
      this.intervalId = setInterval(this.onInterval, mouseTrackingInterval);
    });
  }

  private onDrag = (e: MouseEvent) => {
    // true if mouse is beyond screen or browser does not support this coordinate while dragging
    if (!e.pageY) {
      this.mousePageY = null;
      return;
    }

    this.mousePageY = e.pageY;
  }

  private onInterval = () => {
    this.adjustScrollPosition();
  }

  private stopTrackingMouse() {
    if (!this.isTracking) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      if (this.intervalId != null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      document.removeEventListener('drag', this.onDrag, false);
      this.mousePageY = null;
    });
    this.isTracking = false;
  }

  private canParentScroll(): boolean {
    const element = this.parent.nativeElement as HTMLElement;
    return element.scrollHeight > element.clientHeight;
  }

  private adjustScrollPosition() {
    const position = this.getRelativeMousePosition();

    if (position === 'above') {
      this.scroll(-scrollStepPx);
    } else if (position === 'below') {
      this.scroll(scrollStepPx);
    }

    return;
  }

  private scroll(scrollDistance: number) {
    const element = this.parent.nativeElement as HTMLElement;

    const maxTop = element.scrollHeight - element.clientHeight;

    let newTop = element.scrollTop + scrollDistance;
    if (newTop < 0) newTop = 0;
    if (newTop > maxTop) {
      newTop = maxTop;
    }

    if (_.isFunction(element.scrollTo)) {
      element.scrollTo({ top: newTop });
    } else {
      element.scrollTop = newTop;
    }
  }

  private getRelativeMousePosition(): relativePos | null {
    const elementPageY = getElementPageY(this.parent.nativeElement);

    if (elementPageY == null || this.mousePageY == null) {
      return null;
    }

    const scrollBorderPx = this.parent.nativeElement.clientHeight / 4;

    const upperScrollStart = this.mousePageY - scrollBorderPx;
    const upperScrollEnd =  this.mousePageY;
    if (elementPageY > upperScrollStart && elementPageY < upperScrollEnd) {
      return 'above';
    }
    const lowerScrollStart = elementPageY + this.parent.nativeElement.clientHeight - scrollBorderPx;
    const lowerScrollEnd =  elementPageY + this.parent.nativeElement.clientHeight;
    if (this.mousePageY > lowerScrollStart && this.mousePageY < lowerScrollEnd) {
      return 'below';
    }

    return 'inside';
  }
}
