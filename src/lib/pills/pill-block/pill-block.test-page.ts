import { DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';

export class PillBlockTestPage {
  constructor(private readonly element: DebugElement) { }

  public getItemTexts(): string[] {
    return this.element.queryAll(By.css('span.c-badge > span')).map(item => (item.nativeElement as HTMLElement).textContent.trim());
  }

  public clickRemoveButton(index: number) {
    const button = this.element.query(By.css(`span.c-badge:nth-of-type(${index + 1}) > i`)).nativeElement as HTMLElement;

    button.click();
    button.dispatchEvent(new Event('click'));
  }

  public pressKey(keyCode: number) {
    this.element.componentInstance.onKeyDown({ keyCode } as any);
    this.element.injector.get<ChangeDetectorRef>(ChangeDetectorRef as any).markForCheck();
  }

  public getCurrentItemIndex(): number | null {
    const allItems = this.element.queryAll(By.css(`span.c-badge`));

    for (let i = 0; i < allItems.length; i++) {
      if (document.activeElement === allItems[i].nativeElement) {
        return i;
      }
    }

    return null;
  }
}
