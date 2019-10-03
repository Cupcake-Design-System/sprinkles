import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RichMultiselectPanelComponent } from './rich-multiselect-panel.component';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { IListItem, IListAction, IListSearchResult, IListChangedEvent } from '../types';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/lib/loader/loader.module';
import { PillsModule } from 'src/lib/pills/pills.module';
import { ButtonModule } from 'src/lib/button';
import { SprCommonModule } from 'src/lib/common';
import { RichMultiselectActionComponent } from './rich-multiselect-action/rich-multiselect-action.component';
import { PillBlockTestPage } from 'src/lib/pills/pill-block/pill-block.test-page';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import { CheckboxModule } from 'src/lib/checkbox';
import { SearchSelectTestPage } from '../search-select-panel/search-select-panel.test-page';
import { SearchSelectPanelComponent } from '../search-select-panel/search-select-panel.component';
import { SelectPanelItemsComponent } from '../search-select-panel/select-panel-items/select-panel-items.component';

class TestPage {
  constructor(private readonly element: DebugElement) { }

  public getPillsPage(): PillBlockTestPage {
    const item = this.element.query(By.css('spr-pill-block'));
    if (item == null) {
      return null;
    }
    return new PillBlockTestPage(item);
  }

  public getSearchSelectPage(): SearchSelectTestPage {
    const item = this.element.query(By.css('spr-search-select-panel'));
    if (item == null) {
      return null;
    }
    return new SearchSelectTestPage(item);
  }

  public isActionPanelShown(): boolean {
    return this.element.query(By.css('spr-rich-multiselect-action')) != null;
  }

  public getActionText(): string | null {
    const button = this.getActionButton();

    if (button == null) {
      return null;
    }

    return button.textContent.trim();
  }

  public clickActionButton() {
    const button = this.getActionButton();

    button.click();
    button.dispatchEvent(new Event('click'));
  }

  public isActionButtonFocused(): boolean {
    const button = this.getActionButton();

    if (button == null) {
      return false;
    }

    return document.activeElement === button;
  }

  public focus() {
    (this.element.nativeElement as HTMLElement).focus();
  }

  private getActionButton(): HTMLButtonElement | null {
    const button = this.element.query(By.css('spr-rich-multiselect-action button'));
    if (button == null) {
      return null;
    }
    return button.nativeElement as HTMLButtonElement;
  }
}

describe('RichMultiselectPanelComponent', () => {
  const searchDebounceTimeMs = 3;
  let testPage: TestPage;
  let fixture: ComponentFixture<RichMultiselectPanelComponent>;
  let selectedItems$: BehaviorSubject<IListItem[]>;
  let searchResult$: BehaviorSubject<IListSearchResult>;
  let action$: BehaviorSubject<IListAction | null>;
  let search$: BehaviorSubject<string>;

  let allItems: IListItem[];

  let reportedSelectionChange: IListChangedEvent;
  let remoteSearchEnabled: boolean;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        LoaderModule,
        PillsModule,
        ButtonModule,
        CheckboxModule,
        SprCommonModule
      ],
      declarations: [
        RichMultiselectPanelComponent,
        RichMultiselectActionComponent,
        SearchSelectPanelComponent,
        SelectPanelItemsComponent
      ]
    })
      .compileComponents()
      .then(() => {
        fillTestItems();
        remoteSearchEnabled = true;
        selectedItems$ = new BehaviorSubject([]);
        searchResult$ = new BehaviorSubject({ items: allItems, isLoading: false, isTooManyResults: false });
        action$ = new BehaviorSubject(null);
        search$ = new BehaviorSubject('');

        fixture = TestBed.createComponent(RichMultiselectPanelComponent);
        fixture.componentInstance.externalSelectedItems$ = selectedItems$;
        fixture.componentInstance.searchResult$ = searchResult$;
        fixture.componentInstance.action$ = action$;
        fixture.componentInstance.search$ = search$;
        fixture.componentInstance.localFilter = null;
        fixture.componentInstance.searchDebounceTimeMs = searchDebounceTimeMs;

        testPage = new TestPage(fixture.debugElement);

        reportSelectionChange();
        setupSearch();

        fixture.detectChanges();
      });
  }));

  it('should display no pills and have no checked items when no items selected', () => {
    expect(testPage.getPillsPage().getItemTexts().length).toBe(0);
    expect(testPage.getSearchSelectPage().getSelectedItemTexts().length).toBe(0);
  });

  it('should display selected externally items', fakeAsync(() => {
    const selectedItems = [allItems[3], allItems[0]];

    selectedItems$.next(selectedItems);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getPillsPage().getItemTexts()).toEqual([allItems[3].text, allItems[0].text]);
    expect(testPage.getSearchSelectPage().getSelectedItemTexts()).toEqual([allItems[0].text, allItems[3].text]);
  }));

  it('should select item from search select', fakeAsync(() => {
    const selectedItems = [allItems[3]];
    selectedItems$.next(selectedItems);
    fixture.detectChanges();
    tick(1);

    testPage.getSearchSelectPage().setItemChecked(0, true);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getPillsPage().getItemTexts()).toEqual([allItems[3].text, allItems[0].text]);
    expect(reportedSelectionChange).toEqual({
      allSelected: [allItems[3], allItems[0]],
      added: [allItems[0]],
      removed: []
    });
  }));

  it('should unselect item from search select', fakeAsync(() => {
    const selectedItems = [allItems[3], allItems[0]];
    selectedItems$.next(selectedItems);
    fixture.detectChanges();
    tick(1);

    testPage.getSearchSelectPage().setItemChecked(3, false);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getPillsPage().getItemTexts()).toEqual([allItems[0].text]);
    expect(reportedSelectionChange).toEqual({
      allSelected: [allItems[0]],
      added: [],
      removed: [allItems[3]]
    });
  }));

  it('should unselect item from pill block', fakeAsync(() => {
    const selectedItems = [allItems[3], allItems[0]];
    selectedItems$.next(selectedItems);
    fixture.detectChanges();
    tick(1);

    testPage.getPillsPage().clickRemoveButton(1);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getSearchSelectPage().getSelectedItemTexts()).toEqual([allItems[3].text]);
    expect(reportedSelectionChange).toEqual({
      allSelected: [allItems[3]],
      added: [],
      removed: [allItems[0]]
    });
  }));

  it('should search items', fakeAsync(() => {
    testPage.getSearchSelectPage().setSearch('ir');
    fixture.detectChanges();
    tick(searchDebounceTimeMs);
    fixture.detectChanges();

    expect(testPage.getSearchSelectPage().getItemTexts()).toEqual([allItems[0].text, allItems[2].text]);
  }));

  it('should display external search string without requesting new items', fakeAsync(() => {
    const searchString = 'ir';
    search$.next(searchString);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getSearchSelectPage().getSearch()).toBe(searchString);
    expect(testPage.getSearchSelectPage().getItemTexts().length).toBe(allItems.length);
  }));

  it('should not display action panel when no action is passed', fakeAsync(() => {
    action$.next(null);
    fixture.detectChanges();
    tick(1);

    expect(testPage.isActionPanelShown()).toBe(false);
  }));

  it('should focus first pill when whole component is focused', fakeAsync(() => {
    selectedItems$.next([allItems[3], allItems[0]]);
    fixture.detectChanges();
    tick(1);

    testPage.focus();
    fixture.detectChanges();
    tick(1);

    expect(testPage.getPillsPage().getCurrentItemIndex()).toBe(0);
  }));

  it('should focus search input when whole component is focused and no items selected', fakeAsync(() => {
    testPage.focus();
    fixture.detectChanges();
    tick(1);

    expect(testPage.getSearchSelectPage().isSearchFocused()).toBe(true);
  }));

  it('should focus search input after pills', fakeAsync(() => {
    selectedItems$.next([allItems[3], allItems[0]]);
    fixture.detectChanges();
    tick(1);
    testPage.focus();
    fixture.detectChanges();
    tick(1);

    testPage.getPillsPage().pressKey(39);
    testPage.getPillsPage().pressKey(39);
    fixture.detectChanges();
    tick(1);

    expect(testPage.getSearchSelectPage().isSearchFocused()).toBe(true);
  }));

  it('should focus action panel after search select', fakeAsync(() => {
    selectedItems$.next([allItems[3], allItems[0]]);
    action$.next({ text: 'test action', execute: () => EMPTY });
    fixture.detectChanges();
    tick(1);
    testPage.focus();
    fixture.detectChanges();
    tick(1);

    testPage.getPillsPage().pressKey(39);
    testPage.getPillsPage().pressKey(39);
    fixture.detectChanges();
    tick(1);
    testPage.getSearchSelectPage().pressKey(40);
    testPage.getSearchSelectPage().pressKey(40);
    testPage.getSearchSelectPage().pressKey(40);
    testPage.getSearchSelectPage().pressKey(40);
    fixture.detectChanges();
    tick(1);

    expect(testPage.isActionButtonFocused()).toBe(true);
  }));

  describe('when select all is enabled', () => {
    beforeEach(fakeAsync(() => {
      fixture.componentInstance.addSelectAll = true;
      fixture.detectChanges();

      searchResult$.next({...searchResult$.value});
      fixture.detectChanges();
      tick(1);
    }));

    it('should add select all', () => {
      expect(testPage.getSearchSelectPage().getItemTexts()).toEqual(['Select All', ...allItems.map(item => item.text)]);
    });
  });

  describe('when local search is enabled', () => {
    beforeEach(() => {
      remoteSearchEnabled = false;
      fixture.componentInstance.localFilter = 'default';
      fixture.detectChanges();
    });

    it('should search locally', fakeAsync(() => {
      const searchSelectPage = testPage.getSearchSelectPage();
      searchSelectPage.setSearch('ir');
      fixture.detectChanges();
      tick(searchDebounceTimeMs);
      fixture.detectChanges();

      expect(searchSelectPage.getItemTexts()).toEqual(['first', 'third']);
    }));
  });

  describe('when panel has action', () => {
    const actionText = 'execute action';
    let isActionInvoked: boolean;

    beforeEach(fakeAsync(() => {
      isActionInvoked = false;

      action$.next({
        text: actionText,
        execute: () => {
          isActionInvoked = true;
          return EMPTY.pipe(delay(1));
        }
      });
      fixture.detectChanges();
      tick(1);
    }));

    it('should display action text', () => {
      expect(testPage.getActionText()).toBe(actionText);
    });

    it('should invoke action when action button is clicked', () => {
      testPage.clickActionButton();

      expect(isActionInvoked).toBe(true);
    });

    it('should not invoke action while current action is not yet completed', () => {
      testPage.clickActionButton();
      isActionInvoked = false;

      testPage.clickActionButton();

      expect(isActionInvoked).toBe(false);
    });

    it('should allow to invoke another action after previous action is completed', fakeAsync(() => {
      testPage.clickActionButton();
      isActionInvoked = false;

      tick(1);
      testPage.clickActionButton();
      tick(1);

      expect(isActionInvoked).toBe(true);
    }));

    it('should remove action panel when action is removed', fakeAsync(() => {
      action$.next(null);
      fixture.detectChanges();
      tick(1);

      expect(testPage.isActionPanelShown()).toBe(false);
    }));
  });

  function fillTestItems() {
    allItems = [
      { id: '1', text: 'first', payload: {} },
      { id: '2', text: 'second', payload: {} },
      { id: '3', text: 'third', payload: {} },
      { id: '4', text: 'fourth', payload: {} }
    ];
  }

  function reportSelectionChange() {
    reportedSelectionChange = null;
    fixture.componentInstance.selectionChanged.subscribe(newSelection => reportedSelectionChange = newSelection);
  }

  function setupSearch() {
    fixture.componentInstance.searchChanged.subscribe(search => {
      searchResult$.next({ items: allItems.filter(i => i.text.indexOf(search) !== -1), isTooManyResults: false, isLoading: false });
    });
  }
});
