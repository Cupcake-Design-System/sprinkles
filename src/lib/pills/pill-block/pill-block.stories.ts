import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  number
} from '@storybook/addon-knobs/angular';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IListItem } from 'src/lib/selectors';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PillsModule } from '../pills.module';
import * as note from './pill-block.notes.md';
import { noItemsSelectedMessageDefault } from './pill-block.component';

const allItems = [
  { id: 'long', text: 'very very very very very long long long name' },
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
  styles: [`
    :host {
      display: block;
      width: 200px;
    }
  `],
  template: `
    <spr-pill-block
      [items$]="items$"
      [noItemsMessage]="noItemsMessage"
      [maxPillWidthPx]="maxPillWidthPx !== 0 ? maxPillWidthPx : null"
      (itemsChanged)="itemsChanged.emit($event)">
    </spr-pill-block>
  `
})
export class PillBlockDemoComponent implements OnChanges {
  @Input()
  public noItemsMessage: string;

  @Input()
  public itemIds = '';

  @Input()
  public maxPillWidthPx: number | null = null;

  @Output()
  public itemsChanged = new EventEmitter<IListItem[]>();

  public items$ = new BehaviorSubject<IListItem[]>([]);

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.itemIds) {
      const itemIds = this.itemIds.split(',').map(id => id.trim());

      this.items$.next(itemIds.map(id => allItems.find(item => item.id === id)).filter(item => item != null));
    }
  }
}

const actions = {
  itemsChanged: action('items changed')
};

storiesOf('Components|Pills', module)
  .addDecorator(
    withKnobs
  )
  .add('PillBlock', () => ({
    moduleMetadata: {
      imports: [CommonModule, PillsModule],
      declarations: [PillBlockDemoComponent]
    },
    component: PillBlockDemoComponent,
    props: {
      noItemsMessage: text('No items message', noItemsSelectedMessageDefault),
      itemIds: text('Selected item ids', 'long, 2, 3, 4, 5, 6, 7'),
      itemsChanged: actions.itemsChanged,
      maxPillWidthPx: number('Max pill width px', 0)
    }
  }),
  { notes: { markdown: note } }
);
