import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { sizeLDSType } from "./enum";

@Directive({
  selector: "[spr-input]",
  exportAs: "sprInput",
  host: {
    "[class.c-input-disabled]": "disabled",
    "[class.c-input-lg]": `size === 'large'`,
    "[class.c-input-sm]": `size === 'small'`
  }
})
export class SprInputDirective {
  @Input() size: sizeLDSType = "default";
  @Input() disabled = false;

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, "c-input");
  }
}
