import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  Renderer2
} from '@angular/core';
import { mixinColor, CupcakeFlavors, mixinSize, CupcakeSizes } from '../common';


const CLASS_BASE = 'avatar';

export class AvatarBase {
  constructor(public renderer: Renderer2,  public mixinRef: ElementRef) { }
}

export const AvatarMixinBase = mixinSize(mixinColor(AvatarBase, CLASS_BASE), CLASS_BASE);


export enum AvatarType {
  DEFAULT = 'default',
  IMAGE = 'image',
  ICON = 'icon'
}

@Component({
  selector: 'spr-avatar',
  templateUrl: 'avatar.component.html'
})
export class AvatarComponent extends AvatarMixinBase implements OnInit, AfterViewInit {
  @Input() size: CupcakeSizes = undefined;
  @Input() color: CupcakeFlavors = CupcakeFlavors.Primary;

  @ViewChild('image')
  public image: ElementRef;

  @ViewChild('defaultTemplate', {
    read: TemplateRef
  })
  protected defaultTemplate: TemplateRef<any>;

  @ViewChild('imageTemplate', {
    read: TemplateRef
  })
  protected imageTemplate: TemplateRef<any>;


  @ViewChild('iconTemplate', {
    read: TemplateRef
  })
  protected iconTemplate: TemplateRef<any>;

  @HostBinding('class.c-avatar')
  cssClass = true;


  @HostBinding('class.c-avatar-square') _square;
  @Input() set square(val) {
    this._square = val !== undefined && val !== false ? true : undefined;
  }

  @HostBinding('attr.data-status')
  @Input()
  status: string;

  @HostBinding('attr.data-badge')
  @Input()
  badge: string;


  @HostBinding('attr.data-text')
  @Input()
  initials: string;


  @Input()
  public icon: string;


  @Input()
  public src: string;

  @HostBinding('style.background')
  @Input()
  public bgColor: string;


  get type(): AvatarType {
    if (this.src) {
      return AvatarType.IMAGE;
    }

    if (this.icon) {
      return AvatarType.ICON;
    }

    return AvatarType.DEFAULT;
  }

  get template(): TemplateRef<any> {
    switch (this.type) {
      case AvatarType.IMAGE:
        return this.imageTemplate;
      case AvatarType.ICON:
        return this.iconTemplate;
      default:
        return this.defaultTemplate;
    }
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, ) {super(renderer, elementRef); }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
  }
}
