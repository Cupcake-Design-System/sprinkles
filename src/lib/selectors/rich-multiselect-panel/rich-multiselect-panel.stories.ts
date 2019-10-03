import { storiesOf } from '@storybook/angular';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { IListAction } from '../types';
import { SelectorsModule } from '../selectors.module';
import { CommonModule } from '@angular/common';
import { PillsModule } from 'src/lib/pills/pills.module';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number
} from '@storybook/addon-knobs/angular';
import { FormsModule } from '@angular/forms';
import * as note from './rich-multiselect-panel.notes.md';
import { SearchSelectPanelDemoComponent, createSearchSelectDemoProperties } from '../search-select-panel/search-select-panel.stories';
import { noItemsSelectedMessageDefault } from 'src/lib/pills/pill-block/pill-block.component';

@Component({
  selector: 'spr-rich-multiselect-demo',
  styles: [`
    :host {
      display: block;
      width: 300px;
    }

    spr-rich-multiselect-panel {
      width: 100%;
    }

    .item-container {
      display: flex;
      justify-content: space-between;
    }
  `],
  template: `
    <spr-rich-multiselect-panel
      [selectedItems$]="selectedItems$"
      [searchResult$]="searchResult$"
      [action$]="action$"
      [search$]="search$"
      [selectorHeight]="selectorHeight"
      [noResultsMessage]="noResultsMessage"
      [tooManyResultsMessage]="tooManyResultsMessage"
      [noItemsSelectedMessage]="noItemsSelectedMessage"
      [searchPlaceholder]="searchPlaceholder"
      [size]="size"
      [maxPillWidthPx]="maxPillWidthPx !== 0 ? maxPillWidthPx : null"
      [addSelectAll]="addSelectAll"
      [searchDebounceTimeMs]="searchDebounceTimeMs"
      (searchChanged)="onSearchChanged($event)"
      (selectionChanged)="selectionChanged.emit($event)">
    </spr-rich-multiselect-panel>`
})
class RichMultiselectDemoComponent extends SearchSelectPanelDemoComponent implements OnChanges {
  @Input()
  public actionText: string | null = null;

  @Input()
  public executeAction: (() => Observable<void>) | null = null;

  @Input()
  public selectorHeight: string | null = null;

  @Input()
  public noItemsSelectedMessage: string | null = null;

  @Input()
  public maxPillWidthPx: number | null = 0;

  @Input()
  public addSelectAll = false;

  @Input()
  public searchDebounceTimeMs = 300;

  public readonly action$ = new BehaviorSubject<IListAction | null>(null);

  public ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    this.zone.run(() => {
      if (changes.actionText || changes.executeAction) {
        if (this.actionText && this.executeAction != null) {
          this.action$.next({
            text: this.actionText,
            execute: (...args) => { this.executeAction(...args); return EMPTY; }
          });
        } else {
          this.action$.next(null);
        }
      }
    });
  }

  public onSearchChanged(newSearch: string) {
    this.search$.next(newSearch);
    this.searchChanged.emit(newSearch);
  }
}

const actions = {
  onExecuteAction: action('Action invoked')
};

storiesOf('Components|Selectors', module)
  .addDecorator(
    withKnobs
  )
  .add('RichMultiselectPanel', () => (
    {
      moduleMetadata: {
        imports: [CommonModule, PillsModule, SelectorsModule, FormsModule],
        declarations: [RichMultiselectDemoComponent]
      },
      component: RichMultiselectDemoComponent,
      props: createRichMultiselectDemoProperties()
    }),
    { notes: { markdown: note } }
  );

function createRichMultiselectDemoProperties() {
  return {
    ...createSearchSelectDemoProperties(false),
    actionText: text('Action text', 'Add Contact'),
    selectorHeight: text('Selector Height', '150px'),
    noItemsSelectedMessage: text('No items selected message', noItemsSelectedMessageDefault),
    maxPillWidthPx: number('Max pill width px', 0),
    executeAction: (...args) => {
      actions.onExecuteAction(...args);
      return EMPTY;
    }
  };
}
