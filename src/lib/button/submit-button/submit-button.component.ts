import { Component, Input, HostBinding, Renderer2, ElementRef, OnInit } from '@angular/core';
import { ButtonMixinBase } from '../button.component';
import { Colorable, CupcakeFlavors, CupcakeSizes } from '../../common';

@Component({
  selector: 'button[spr-button][submit]',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent extends ButtonMixinBase implements Colorable {
  @Input()
  color: CupcakeFlavors = undefined;
  @Input()
  size: CupcakeSizes = undefined;
  @Input()
  submittingText: string;
  @Input()
  animate: boolean;
  @Input()
  outline: boolean;

  @Input()
  @HostBinding('attr.disabled')
  disabled: boolean;

  @HostBinding('attr.disabled')
  get disabledAttribute() {
    return this.disabled ? true : undefined;
  }

  @HostBinding('class.c-btn')
  cssClass = true;

  public get submitText() {
    return this.submittingText ? this.submittingText : 'Submitting';
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
    super(renderer, elementRef);
  }

}
