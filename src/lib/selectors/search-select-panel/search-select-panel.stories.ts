import { storiesOf } from '@storybook/angular';
import { Component, Input, OnChanges, SimpleChanges, NgZone, EventEmitter, Output, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, concat } from 'rxjs';
import { IListSearchResult, IListItem } from '../types';
import { switchMap, delay } from 'rxjs/operators';
import { SelectorsModule } from '../selectors.module';
import { CommonModule } from '@angular/common';
import { PillsModule } from 'src/lib/pills/pills.module';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs/angular';
import { FormsModule } from '@angular/forms';
import { noResultsMessageDefault, tooManyResultsMessageDefault, searchPlaceholderDefault } from './search-select-panel.component';
import * as note from './search-select-panel.notes.md';
import { CupcakeSizes } from 'src/lib/common';

const allItems = [
  { id: '1', text: 'first first first first first first first first first first first first first first first' },
  { id: '2', text: 'second' },
  { id: '3', text: 'third' },
  { id: '4', text: 'fourth' },
  { id: '5', text: 'fifth' },
  { id: '6', text: 'sixth' },
  { id: '7', text: 'seventh' },
  { id: '8', text: 'eigth' },
  { id: '9', text: 'nine' },
  { id: '10', text: 'ten' }
];

@Component({
  selector: 'spr-search-select-demo',
  styles: [`
    :host {
      display: block;
      width: 300px;
    }

    spr-search-select-panel {
      width: 100%;
      height: 150px;
    }

    .item-container {
      display: flex;
      justify-content: space-between;
    }
  `],
  template: `
    <spr-search-select-panel
      [selectedItems$]="selectedItems$"
      [searchResult$]="searchResult$"
      [search$]="search$"
      [noResultsMessage]="noResultsMessage"
      [tooManyResultsMessage]="tooManyResultsMessage"
      [searchPlaceholder]="searchPlaceholder"
      (searchChanged)="onSearchChanged($event)"
      [size]="size"
      [showSearch]="showSearch"
      [highlightSearchFocus]="highlightSearchFocus"
      [localFilter]="localSearch ? 'default' : null"
      [addSelectAll]="addSelectAll"
      [searchDebounceTimeMs]="searchDebounceTimeMs"
      (selectionChanged)="selectionChanged.emit($event)">
    </spr-search-select-panel>`
})
export class SearchSelectPanelDemoComponent implements OnChanges, OnInit {
  @Input()
  public selectedItems: string;

  @Input()
  public items: IListItem[];

  @Input()
  public search = '';

  @Input()
  public localSearch = false;

  @Input()
  public selectorHeight: string | null = null;

  @Input()
  public noResultsMessage: string | null = null;

  @Input()
  public tooManyResultsMessage: string | null = null;

  @Input()
  public searchPlaceholder: string | null = null;

  @Input()
  public maxItems: number;
  @Input()
  public size: CupcakeSizes = undefined;
  @Input()
  public showSearch = true;

  @Input()
  public highlightSearchFocus = true;
  @Input()
  public addSelectAll = false;
  @Input()
  public searchDebounceTimeMs = 300;

  @Output()
  public searchChanged = new EventEmitter<string>();

  @Output()
  public selectionChanged = new EventEmitter<IListItem>();

  public readonly selectedItems$ = new BehaviorSubject<IListItem[]>([]);

  public searchResult$: Observable<IListSearchResult>;

  public readonly search$ = new BehaviorSubject('');

  constructor(protected readonly zone: NgZone) { }

  public ngOnChanges(changes: SimpleChanges) {
    // knobs mess up zones somehow
    this.zone.run(() => {
      if (changes.selectedItems) {
        const texts = this.selectedItems.split(',').map(v => v.trim());

        const selectedItems = texts.map(t => allItems.find(item => item.text === t)).filter(item => item != null);

        this.selectedItems$.next(selectedItems);
      }

      if (changes.search) {
        this.search$.next(this.search);
      }

      if (changes.maxItems) {
        this.search$.next(this.search$.value);
      }
    });
  }

  public ngOnInit() {
    if (this.localSearch) {
      this.searchResult$ = of({
        items: this.items,
        isLoading: false,
        isTooManyResults: false
      });
    } else {
      this.searchResult$ = this.search$.pipe(
        switchMap(search => {
          const loading$ = {
            isLoading: true,
            isTooManyResults: false,
            items: []
          };

          const results = {
            isLoading: false,
            isTooManyResults: false,
            items: this.items.filter(item => item.text.indexOf(search) !== -1).map(item => ({ ...item, payload: null }))
          };

          if (results.items.length > this.maxItems) {
            results.items = [];
            results.isTooManyResults = true;
          }

          return concat(
            of(loading$),
            of(results).pipe(delay(3000))
          );
        }));
    }
  }

  public onSearchChanged(newSearch: string) {
    this.search$.next(newSearch);
    this.searchChanged.emit(newSearch);
  }
}

const actions = {
  onExecuteAction: action('Action invoked'),
  onSearchChanged: action('Search changed'),
  onSelectionChanged: action('Selection changed')
};

storiesOf('Components|Selectors', module)
  .addParameters({ jest: ['search-select-panel.component'] })
  .addDecorator(
    withKnobs
  )
  .add('SearchSelectPanel', () => (
    {
      moduleMetadata: {
        imports: [CommonModule, PillsModule, SelectorsModule, FormsModule],
        declarations: [SearchSelectPanelDemoComponent]
      },
      component: SearchSelectPanelDemoComponent,
      props: createSearchSelectDemoProperties()
    }),
    { notes: { markdown: note } }
  );

export function createSearchSelectDemoProperties(addShowSearch = true) {
  return {
    items: allItems,
    selectedItems: text('Selected items', ''),
    search: text('Search', ''),
    showSearch: addShowSearch ? boolean('Show Search', true) : undefined,
    localSearch: boolean('Local Search', false),
    noResultsMessage: text('No results message', noResultsMessageDefault),
    tooManyResultsMessage: text('Too many results message', tooManyResultsMessageDefault),
    searchPlaceholder: text('Search placeholder', searchPlaceholderDefault),
    maxItems: number('Max items (demo)', 20),
    searchChanged: actions.onSearchChanged,
    selectionChanged: actions.onSelectionChanged,
    size: select('size', CupcakeSizes, 'sm'),
    highlightSearchFocus: boolean('Highlight search focus', true),
    addSelectAll: boolean('Add Select All', false),
    searchDebounceTimeMs: number('Search Debounce Time ms', 300)
  };
}
