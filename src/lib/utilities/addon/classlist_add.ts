import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[classListAdd]",
  exportAs: "classListAdd"
})
export class classListAddDirective {
  classList: string[] = [];

  @Input()
  set classListAdd(list: string[]) {
    this.classList.forEach(name => {
      this.renderer.removeClass(this.elementRef.nativeElement, name);
    });
    list.forEach(name => {
      this.renderer.addClass(this.elementRef.nativeElement, name);
    });
    this.classList = list;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
