import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { mixinColor, CupcakeFlavors, mixinSize, CupcakeSizes } from '../common';

const CLASS_BASE = 'badge';


export class BadgeBase {
  constructor(public renderer: Renderer2,  public mixinRef: ElementRef) { }
}

export const BadgeMixinBase = mixinSize(mixinColor(BadgeBase, CLASS_BASE), CLASS_BASE);

@Component({
  selector: 'spr-badge',
  templateUrl: './badge.component.html'
})


export class BadgeComponent extends BadgeMixinBase implements AfterViewInit {
  @Input() size: CupcakeSizes = undefined;
  @Input() color: CupcakeFlavors = CupcakeFlavors.Primary;
  @Input() icon: string;

  @HostBinding('class.c-badge')
  cssClass = true;

  constructor(public renderer: Renderer2, public elementRef: ElementRef) {super(renderer, elementRef); }

  public ngAfterViewInit() {

  }
}
