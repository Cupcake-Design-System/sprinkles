import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/lib/loader/loader.module';
import { SprCommonModule } from 'src/lib/common';
import { SearchSelectPanelComponent } from './search-select-panel.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { IFocusParams, IListItem, IListSearchResult, IListChangedEvent, ControlSide } from '../types';
import { SearchSelectTestPage } from './search-select-panel.test-page';
import { CheckboxModule } from 'src/lib/checkbox';
import { SelectPanelItemsComponent } from './select-panel-items/select-panel-items.component';

describe('SearchSelectComponent', () => {
  const searchDebounceTimeMs = 3;
  let testPage: SearchSelectTestPage;
  let fixture: ComponentFixture<SearchSelectPanelComponent>;
  let selectedItems$: BehaviorSubject<IListItem[]>;
  let searchResult$: BehaviorSubject<IListSearchResult>;
  let search$: BehaviorSubject<string>;
  let focus$: Subject<IFocusParams>;
  let remoteSearchEnabled: boolean;

  let allItems: IListItem[];

  let reportedSelectionChange: IListChangedEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        LoaderModule,
        CheckboxModule,
        SprCommonModule
      ],
      declarations: [SearchSelectPanelComponent, SelectPanelItemsComponent]
    })
      .compileComponents()
      .then(() => {
        fillTestItems();

        selectedItems$ = new BehaviorSubject([]);
        searchResult$ = new BehaviorSubject({ items: allItems, isTooManyResults: false, isLoading: false });
        search$ = new BehaviorSubject('');
        focus$ = new Subject();

        fixture = TestBed.createComponent(SearchSelectPanelComponent);
        testPage = new SearchSelectTestPage(fixture.debugElement);

        reportSelectionChange();
        setupRemoteSearch();

        fixture.componentInstance.selectedItems$ = selectedItems$;
        fixture.componentInstance.searchResult$ = searchResult$;
        fixture.componentInstance.search$ = search$;
        fixture.componentInstance.focus$ = focus$;
        fixture.componentInstance.localFilter = null;
        fixture.componentInstance.searchDebounceTimeMs = searchDebounceTimeMs;
      });
  }));

  describe('when search input is shown', () => {
    beforeEach(() => {
      remoteSearchEnabled = true;
    });

    describe('on init', () => {
      runCommonOnInitTests();
    });

    describe('after initialized', () => {
      beforeEach(fakeAsync(() => {
        fixture.detectChanges();
        tick(1);
      }));

      runCommonAfterInitTests();

      it('should search items', fakeAsync(() => {
        testPage.setSearch('ir');

        fixture.detectChanges();
        tick(searchDebounceTimeMs);
        fixture.detectChanges();

        expect(testPage.getItemTexts()).toEqual(['first', 'third']);
      }));

      it('should display new search string, should not search for new items when search string is updated externally', fakeAsync(() => {
        const searchString = 'ir';
        search$.next(searchString);

        fixture.detectChanges();
        tick(1);

        expect(testPage.getItemTexts().length).toBe(allItems.length);
        expect(testPage.getSearch()).toBe(searchString);
      }));

      it('should focus search input and select first item when asked to focus top', fakeAsync(() => {
        focus$.next({ to: ControlSide.Top });

        fixture.detectChanges();
        tick(1);

        expect(testPage.isSearchFocused()).toBe(true);
        expect(testPage.getCurrentItemIndex()).toBe(0);
      }));

      it('should focus search input and select last item when asked to focus top', fakeAsync(() => {
        focus$.next({ to: ControlSide.Bottom });
        fixture.detectChanges();
        tick(1);

        expect(testPage.isSearchFocused()).toBe(true);
        expect(testPage.getCurrentItemIndex()).toBe(allItems.length - 1);
      }));

      it('should direct focus to search input when any internal element is focused', () => {
        fixture.componentInstance.onFocusIn({} as any);

        expect(testPage.isSearchFocused()).toBe(true);
      });
    });
  });

  describe('when search input is not shown', () => {
    beforeEach(() => {
      remoteSearchEnabled = true;
      fixture.componentInstance.showSearch = false;
    });

    describe('on init', () => {
      runCommonOnInitTests();
    });

    describe('after initialized', () => {
      beforeEach(fakeAsync(() => {
        fixture.detectChanges();
        tick(1);
      }));

      runCommonAfterInitTests();

      it('should focus first item when asked to focus top', fakeAsync(() => {
        focus$.next({ to: ControlSide.Top });

        fixture.detectChanges();
        tick(1);

        expect(testPage.getCurrentItemIndex()).toBe(0);
      }));

      it('should focus search input and select last item when asked to focus top', fakeAsync(() => {
        focus$.next({ to: ControlSide.Bottom });
        fixture.detectChanges();
        tick(1);

        expect(testPage.getCurrentItemIndex()).toBe(allItems.length - 1);
      }));

      it('should direct focus to host element when any internal element is focused', () => {
        fixture.componentInstance.onFocusIn({} as any);

        expect(testPage.isHostElementFocused()).toBe(true);
      });
    });
  });

  describe('when select all and default local search are enabled', () => {
    beforeEach(() => {
      remoteSearchEnabled = false;
      fixture.componentInstance.addSelectAll = true;
      fixture.componentInstance.localFilter = 'default';
      searchResult$.next({...searchResult$.value});

      fixture.detectChanges();
    });

    it('should show Select All item', () => {
      expect(testPage.getItemTexts()[0]).toBe('Select All');
    });

    it('should search items locally', fakeAsync(() => {
      testPage.setSearch('ir');

      fixture.detectChanges();
      tick(searchDebounceTimeMs);
      fixture.detectChanges();

      expect(testPage.getItemTexts()).toEqual(['Select All', 'first', 'third']);
    }));

    it('should select all items when select all is checked', fakeAsync(() => {
      testPage.setItemChecked(0, true);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['Select All', ...allItems.map(i => i.text)]);
      expect(reportedSelectionChange.added).toEqual(allItems);
      expect(reportedSelectionChange.allSelected).toEqual(allItems);
      expect(reportedSelectionChange.removed).toEqual([]);
    }));

    it('should select all items when select all is checked and some items are filtered out', fakeAsync(() => {
      testPage.setSearch('ir');
      tick(searchDebounceTimeMs);
      fixture.detectChanges();

      testPage.setItemChecked(0, true);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['Select All', 'first', 'third']);
      expect(reportedSelectionChange.added).toEqual(allItems);
      expect(reportedSelectionChange.allSelected).toEqual(allItems);
      expect(reportedSelectionChange.removed).toEqual([]);
    }));

    it('should correctly report selection change when some items are checked and Select All is checked', fakeAsync(() => {
      testPage.setItemChecked(1, true);
      testPage.setItemChecked(2, true);
      testPage.setItemChecked(0, true);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['Select All', ...allItems.map(i => i.text)]);
      expect(reportedSelectionChange.added).toEqual(allItems.slice(2));
      expect(reportedSelectionChange.allSelected).toEqual(allItems);
      expect(reportedSelectionChange.removed).toEqual([]);
    }));

    it('should unselect all items when select all is unselected', fakeAsync(() => {
      testPage.setItemChecked(0, true);
      fixture.detectChanges();
      tick(1);

      testPage.setItemChecked(0, false);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual([]);
      expect(reportedSelectionChange.added).toEqual([]);
      expect(reportedSelectionChange.allSelected).toEqual([]);
      expect(reportedSelectionChange.removed).toEqual(allItems);
    }));

    it('should automatically check Select All when all items are checked', fakeAsync(() => {
      testPage.setItemChecked(1, true);
      testPage.setItemChecked(2, true);
      testPage.setItemChecked(3, true);
      testPage.setItemChecked(4, true);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['Select All', ...allItems.map(i => i.text)]);
      expect(reportedSelectionChange.added).toEqual(allItems.slice(-1));
      expect(reportedSelectionChange.allSelected).toEqual(allItems);
      expect(reportedSelectionChange.removed).toEqual([]);
    }));

    it('should automatically uncheck Select All when all items are checked', fakeAsync(() => {
      testPage.setItemChecked(0, true);
      fixture.detectChanges();
      tick(1);

      testPage.setItemChecked(1, false);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(allItems.slice(1).map(i => i.text));
      expect(reportedSelectionChange.added).toEqual([]);
      expect(reportedSelectionChange.allSelected).toEqual(allItems.slice(1));
      expect(reportedSelectionChange.removed).toEqual([allItems[0]]);
    }));
  });

  function runCommonOnInitTests() {
    it('should display initially selected items', fakeAsync(() => {
      selectedItems$.next([
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ]);

      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['first']);
      expect(reportedSelectionChange).toBe(null);
    }));

    it('should not fail when the list of items is not provided before focus', fakeAsync(() => {
      fixture.componentInstance.searchResult$ = new Subject();

      fixture.detectChanges();
      tick(1);

      expect(() => {
        focus$.next({ to: ControlSide.Top });
      }).not.toThrow();
    }));
  }

  function runCommonAfterInitTests() {
    it('should select item when item is checked', fakeAsync(() => {
      const selectedItems = [
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ];
      const expectedNewSelectedItem = { id: '2', text: 'second', payload: {} };
      selectedItems$.next(selectedItems);
      fixture.detectChanges();
      tick(1);

      testPage.setItemChecked(1, true);
      tick(1);

      expect(reportedSelectionChange).toEqual({
        allSelected: [...selectedItems, expectedNewSelectedItem],
        added: [expectedNewSelectedItem],
        removed: []
      });
    }));

    it('should unselect item when item is unchecked', fakeAsync(() => {
      const selectedItems = [
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ];
      selectedItems$.next(selectedItems);
      fixture.detectChanges();
      tick(1);

      testPage.setItemChecked(0, false);
      tick(1);

      expect(reportedSelectionChange).toEqual({
        allSelected: [selectedItems[1]],
        added: [],
        removed: [selectedItems[0]]
      });
    }));

    it('should move current item down when down button is pressed', fakeAsync(() => {
      testPage.pressKey(40);
      testPage.pressKey(40);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getCurrentItemIndex()).toBe(2);
    }));

    it('should move current item up when up button is pressed', fakeAsync(() => {
      testPage.pressKey(40);
      testPage.pressKey(38);
      fixture.detectChanges();
      tick(1);

      expect(testPage.getCurrentItemIndex()).toBe(0);
    }));

    it('should select current item when enter is pressed and current item is unselected', fakeAsync(() => {
      const selectedItems = [
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ];
      const expectedNewSelectedItem = { id: '2', text: 'second', payload: {} };
      selectedItems$.next(selectedItems);
      testPage.pressKey(40);
      testPage.pressKey(13);
      fixture.detectChanges();
      tick(1);

      expect(reportedSelectionChange).toEqual({
        allSelected: [...selectedItems, expectedNewSelectedItem],
        added: [expectedNewSelectedItem],
        removed: []
      });
    }));

    it('should unselect current item when enter is pressed and current item is selected', fakeAsync(() => {
      const selectedItems = [
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ];
      selectedItems$.next(selectedItems);
      testPage.pressKey(13);
      fixture.detectChanges();
      tick(1);

      expect(reportedSelectionChange).toEqual({
        allSelected: [selectedItems[1]],
        added: [],
        removed: [selectedItems[0]]
      });
    }));

    it('should display selected items when updated externally', fakeAsync(() => {
      selectedItems$.next([
        { id: '1', text: 'first', payload: {} },
        { id: '10', text: 'tenth', payload: {} }
      ]);

      fixture.detectChanges();
      tick(1);

      expect(testPage.getSelectedItemTexts()).toEqual(['first']);
    }));

    it('should show no items message when the list of items is empty', fakeAsync(() => {
      searchResult$.next({ items: [], isLoading: false, isTooManyResults: false });
      fixture.detectChanges();
      tick(1);

      expect(testPage.isNoResultsShown()).toBe(true);
      expect(testPage.areItemsShown()).toBe(false);
      expect(testPage.isTooManyResultsShown()).toBe(false);
      expect(testPage.isSpinnerShown()).toBe(false);
    }));

    it('should show spinner when items are loading', fakeAsync(() => {
      searchResult$.next({ items: [], isLoading: true, isTooManyResults: false });
      fixture.detectChanges();
      tick(1);

      expect(testPage.isNoResultsShown()).toBe(false);
      expect(testPage.areItemsShown()).toBe(false);
      expect(testPage.isTooManyResultsShown()).toBe(false);
      expect(testPage.isSpinnerShown()).toBe(true);
    }));

    it('should focus back to same item when list of items is reloaded and the item is present', fakeAsync(() => {
      testPage.pressKey(40);
      testPage.pressKey(40);
      searchResult$.next({ items: [], isLoading: true, isTooManyResults: false });
      searchResult$.next({ items: allItems, isLoading: false, isTooManyResults: false });

      fixture.detectChanges();
      tick(1);

      expect(testPage.getCurrentItemIndex()).toBe(2);
    }));

    it('should display top item as current when list of items is reloaded and current item is no longer present', fakeAsync(() => {
      testPage.pressKey(40);
      searchResult$.next({ items: [], isLoading: true, isTooManyResults: false });
      searchResult$.next({ items: allItems.filter(i => i.id !== '2'), isLoading: false, isTooManyResults: false });

      fixture.detectChanges();
      tick(1);

      expect(testPage.getCurrentItemIndex()).toBe(0);
    }));
  }

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

  function setupRemoteSearch() {
    fixture.componentInstance.searchChanged.subscribe(search => {
      if (!remoteSearchEnabled) {
        return;
      }

      searchResult$.next({ items: allItems.filter(i => i.text.indexOf(search) !== -1), isTooManyResults: false, isLoading: false });
    });
  }
});
