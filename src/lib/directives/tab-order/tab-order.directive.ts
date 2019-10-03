import { Directive, Attribute, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[sprTabOrder]'
})
export class TabOrderDirective implements OnInit {
  private nextElem: HTMLElement;
  private prevElem: HTMLElement;

  constructor(@Attribute('tab-next') private tabNext: string, @Attribute('tab-prev') private tabPrev: string) { }

  public ngOnInit() {
    if (this.tabNext) {
      const elem = document.getElementById(this.tabNext);
      if (elem) {
        this.nextElem = elem;
      }
    }

    if (this.tabPrev) {
      const elem = document.getElementById(this.tabPrev);
      if (elem) {
        this.prevElem = elem;
      }
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') { return; }

    if (!e.shiftKey && this.nextElem) {
      this.nextElem.focus();
      e.preventDefault();
    }

    if (e.shiftKey && this.prevElem) {
      this.prevElem.focus();
      e.preventDefault();
    }
  }
}
