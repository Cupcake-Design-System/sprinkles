import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  text,
  boolean,
  select
} from '@storybook/addon-knobs/angular';
import { CardsComponent } from './cards.component';
import * as note from './cards.notes.md';
import { CupcakeFlavors } from '../common';

const cardFlavors = Object.values(CupcakeFlavors) as Array<
  typeof CupcakeFlavors
>;

const css = `
  <style>
    .spr-demo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: .5rem;
      height: 100%;
      position: absolute;
      width: 100%;
    }
  </style>
`;

storiesOf('Components|Cards', module)
  .addParameters({ jest: ['cards.component'] })
  .addDecorator(withKnobs)
  .add(
    'Cards',
    () => ({
      moduleMetadata: {
        component: CardsComponent,
        declarations: [CardsComponent]
      },
      component: CardsComponent,
      template: `
      ${css}
        <div class="spr-demo-container">
          <spr-cards
            [draggable]="draggable"
            [headerText]="headerText"
            [headerLinkHref]="headerLinkHref"
            [loading]="loading"
            [height]="height"
            [flavor]="flavor">
            This is sample content for the card. Your implementation will show different content.
          </spr-cards>
        </div>
      `,
      props: {
        draggable: boolean('draggable', false),
        loading: boolean('loading', false),
        headerLinkHref: text('headerLinkHref', '/default'),
        flavor: select('flavor', cardFlavors, 'default'),
        headerText: text('headerText', 'This is a Card Title'),
        height: text('height', '200px')
      }
    }),
    { notes: { markdown: note } }
  );
