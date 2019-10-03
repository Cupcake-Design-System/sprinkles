import { SearchSelectPanelComponent } from './search-select-panel.component';
import { DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from 'src/lib/checkbox';

export class SearchSelectTestPage {
  private readonly component: SearchSelectPanelComponent;

  constructor(private readonly element: DebugElement) {
    this.component = element.componentInstance;
  }

  public isHostElementFocused(): boolean {
    return document.activeElement === this.element.nativeElement;
  }

  public isSearchFocused(): boolean {
    return document.activeElement === this.getSearchInput();
  }

  public setSearch(search: string) {
    const searchInput = this.getSearchInput();
    searchInput.value = search;
    searchInput.dispatchEvent(new Event('input'));
  }

  public getSearch(): string {
    return this.getSearchInput().value;
  }

  public getSearchInput(): HTMLInputElement {
    return this.element.query(By.css('input[type=search]')).nativeElement;
  }

  public getItemTexts(): string[] {
    return this.element.queryAll(By.css('.item-content > div')).map(e => e.nativeElement.textContent.trim());
  }

  public getSelectedItemTexts(): string[] {
    const checkboxes = this.element.queryAll(By.css('spr-checkbox'));
    const texts = [];

    for (const checkbox of checkboxes) {
      if (!(checkbox.componentInstance as CheckboxComponent).checked) {
        continue;
      }

      texts.push((checkbox.query(By.css('.item-content > div')).nativeElement as HTMLElement).textContent.trim());
    }

    return texts;
  }

  public setItemChecked(index: number, checked: boolean) {
    const checkboxes = this.element.queryAll(By.css('spr-checkbox'));
    (checkboxes[index].componentInstance as CheckboxComponent).checked = checked;
  }

  public getCurrentItemIndex(): number | null {
    const listItems = this.element.queryAll(By.css('li'));

    for (let i = 0; i < listItems.length; i++) {
      if ((listItems[i].nativeElement as HTMLElement).classList.contains('spr-current-item')) {
        return i;
      }
    }

    return null;
  }

  public pressKey(keyCode: number) {
    this.component.onKeyDown({ keyCode } as any);
    this.element.injector.get<ChangeDetectorRef>(ChangeDetectorRef as any).markForCheck();
  }

  public areItemsShown(): boolean {
    return this.element.query(By.css('ul')) != null;
  }

  public isSpinnerShown(): boolean {
    return this.element.query(By.css('spr-loader-basic')) != null;
  }

  public isTooManyResultsShown(): boolean {
    return this.element.query(By.css('.too-many-results-message')) != null;
  }

  public isNoResultsShown(): boolean {
    return this.element.query(By.css('.no-results-message')) != null;
  }
}
