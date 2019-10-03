import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { PillBlockComponent } from './pill-block.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { IFocusParams, IListChangedEvent, ControlSide, IListItem } from 'src/lib/selectors';
import { PillBlockTestPage } from './pill-block.test-page';

describe('PillBlockComponent', () => {
  let fixture: ComponentFixture<PillBlockComponent>;
  let testPage: PillBlockTestPage;
  let items$: BehaviorSubject<IListItem[]>;
  let focus$: Subject<IFocusParams>;
  let reportedItemsChange: IListChangedEvent;

  let allItems: IListItem[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [PillBlockComponent]
    })
      .compileComponents()
      .then(() => {
        fillTestItems();

        items$ = new BehaviorSubject(allItems);
        focus$ = new Subject();

        fixture = TestBed.createComponent(PillBlockComponent);
        testPage = new PillBlockTestPage(fixture.debugElement);

        fixture.componentInstance.items$ = items$;
        fixture.componentInstance.focus$ = focus$;

        reportItemsChange();

        fixture.detectChanges();
      });
  }));

  it('should show the initial list of items', () => {
    expect(testPage.getItemTexts()).toEqual(allItems.map(i => i.text));
  });

  it('should update when list of items is updated externally', () => {
    items$.next(allItems.slice(0, 3));

    fixture.detectChanges();

    expect(testPage.getItemTexts()).toEqual(allItems.slice(0, 3).map(i => i.text));
  });

  it('should remove item when remove button is pressed', () => {
    testPage.clickRemoveButton(1);

    expect(reportedItemsChange).toEqual({
      allSelected: allItems.filter(i => i.id !== '2'),
      added: [],
      removed: [allItems[1]]
    });
  });

  it('should focus first item when top level element is focused', () => {
    fixture.nativeElement.focus();

    fixture.detectChanges();

    expect(testPage.getCurrentItemIndex()).toBe(0);
  });

  it('should focus previous item when left arrow button is clicked', () => {
    fixture.componentInstance.onItemFocus(allItems[2]);
    testPage.pressKey(37);

    fixture.detectChanges();

    expect(testPage.getCurrentItemIndex()).toBe(1);
  });

  it('should focus previous item when right arrow button is clicked', () => {
    fixture.componentInstance.onItemFocus(allItems[2]);
    testPage.pressKey(39);

    fixture.detectChanges();

    expect(testPage.getCurrentItemIndex()).toBe(3);
  });

  it('should remove current button when delete is pressed', fakeAsync(() => {
    fixture.componentInstance.onItemFocus(allItems[2]);
    testPage.pressKey(8);

    fixture.detectChanges();
    tick(1);

    expect(testPage.getCurrentItemIndex()).toBe(1);
    expect(reportedItemsChange).toEqual({
      allSelected: allItems.filter(i => i.id !== '3'),
      added: [],
      removed: [allItems[2]]
    });
  }));

  it('should focus first item when asked to move focus to top', () => {
    focus$.next({to: ControlSide.Top});

    expect(testPage.getCurrentItemIndex()).toBe(0);
  });

  it('should focus last item when asked to move focus to bottom', () => {
    focus$.next({to: ControlSide.Bottom});

    expect(testPage.getCurrentItemIndex()).toBe(allItems.length - 1);
  });

  function fillTestItems() {
    allItems = [
      { id: '1', text: 'first', payload: {} },
      { id: '2', text: 'second', payload: {} },
      { id: '3', text: 'third', payload: {} },
      { id: '4', text: 'fourth', payload: {} }
    ];
  }

  function reportItemsChange() {
    reportedItemsChange = null;
    fixture.componentInstance.itemsChanged.subscribe(items => {
      reportedItemsChange = items;
    });
  }
});
