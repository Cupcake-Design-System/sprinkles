import { Component, ElementRef, Input, Renderer2, HostBinding, AfterViewInit } from '@angular/core';
import { mixinColor, CupcakeFlavors, CupcakeSizes, mixinSize } from '../common';

const CLASS_BASE = 'btn';

export class ButtonBase {
  constructor(public renderer: Renderer2, public mixinRef: ElementRef) { }

}

export const ButtonMixinBase = mixinSize(mixinColor(ButtonBase, CLASS_BASE), CLASS_BASE);

@Component({
  selector: 'button[spr-button]:not([link]):not([submit])',
  templateUrl: './button.component.html'
})
export class ButtonComponent extends ButtonMixinBase implements AfterViewInit {
  @Input() color: CupcakeFlavors = CupcakeFlavors.Primary;
  @Input() size: CupcakeSizes = undefined;
  @Input() outline: boolean;

  @HostBinding('class.c-btn-box') _icon;
  @Input() set icon(val) {
    this._icon = val !== undefined && val !== false ? true : undefined;
  }

  @HostBinding('class.c-btn-circle') _circle;
  @Input() set circle(val) {
    this._circle = val !== undefined && val !== false ? true : undefined;
  }
  @HostBinding('attr.disabled') _disabled;
  @Input() set disabled(val) {
    this._disabled = val ? val : undefined;
  }

  @HostBinding('class.c-btn')
  cssClass = true;

  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
    super(renderer, elementRef);
  }
  ngAfterViewInit() {}
}
