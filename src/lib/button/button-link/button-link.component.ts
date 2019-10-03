import { Component, Input, HostBinding, Renderer2, ElementRef, OnInit } from '@angular/core';
import { ButtonBase } from '../button.component';
import { mixinColor, Colorable, CupcakeFlavors, mixinSize, CupcakeSizes } from '../../common';

const LINK_CLASS_BASE = 'btn-link';
export const ButtonLinkMixinBase = mixinSize(mixinColor(ButtonBase, LINK_CLASS_BASE), LINK_CLASS_BASE);

@Component({
  selector: 'button[spr-button][link]',
  templateUrl: './button-link.component.html'
})
export class ButtonLinkComponent extends ButtonLinkMixinBase implements OnInit, Colorable {
  @Input()
  color: CupcakeFlavors = CupcakeFlavors.Primary;
  @Input()
  size: CupcakeSizes = undefined;
  @Input()
  disabled: boolean;

  @HostBinding('attr.disabled')
  get disabledAttribute() {
    return this.disabled ? true : undefined;
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
    super(renderer, elementRef);
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'c-btn-link');
  }
}
