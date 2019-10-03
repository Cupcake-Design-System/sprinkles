import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  object,
  select,
  boolean,
  text
} from '@storybook/addon-knobs/angular';

import * as note from './multivalue-data-table/multivalue-data-table.component.md';
import { CupcakeFlavors, CupcakeSizes, CupcakeDirections } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';
import { IMultivalueDataRow } from '.';
import { MultivalueDataTableComponent } from './multivalue-data-table/multivalue-data-table.component';

const colors = {
    default: null,
    primary: CupcakeFlavors.Primary,
    secondary: CupcakeFlavors.Secondary,
    success: CupcakeFlavors.Success,
    warning: CupcakeFlavors.Warning,
    danger: CupcakeFlavors.Danger
};

const size = {
    default: null,
    xs: CupcakeSizes.xs,
    sm: CupcakeSizes.sm,
    lg: CupcakeSizes.lg,
    xl: CupcakeSizes.xl
};

const directions = {
  default: null,
  below: CupcakeDirections.below,
  above: CupcakeDirections.above,
  right: CupcakeDirections.right
};

export const defaultItems: IMultivalueDataRow[] = [
  { label: 'Identifiers',
    children: [
      { label: 'Security Type',
      values: [ 'Common Shares', 'ADR' ],
      config: { customValueClasses: ['my-custom-class'] }
     },
    { label: 'Long Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel fermentum tortor.',
      config: { isItalic: true },
      values: [ 'Exempt', 'Private'] },
    { label: 'Exchange',
      values: [ 'NYSE', 'LSE' ]},
    { label: 'Settlement Symbols',
      children: [
        { label: 'CUSIP',
        values: ['Long Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel fermentum tortor, a efficitur tortor. Proin sit amet risus dignissim, commodo libero sit amet.', 'value 2'],
          children: [
            {label: 'Grandchild', values: ['1231434', '245345'],
                        children: [
              {label: 'Great Grandchild', values: ['1231434', '245345']}
            ]}
          ] },
        { label: 'ISYN',
          values: [ '1234', '12-24' ] }
      ],
      config: { isBold: true, isItalic: true}
    },
    { label: 'Offer Price',
      values: [ '10.00 USD', '8.43 GBP' ]}
    ]
}
];

storiesOf('Components|Data', module)
  .addParameters({ jest: ['multivalue-data-table.component'] })
  .addDecorator(withKnobs)
  .add(
    'Multivalue Table',
    () => ({
      moduleMetadata: {
        imports: [],
        component: [MultivalueDataTableComponent],
        declarations: [MultivalueDataTableComponent]
      },
      component: MultivalueDataTableComponent,
      template: `
      <div style="margin-left: 250px; position: relative;">
      <div class="spr-demo-container" style="width: 400px;">
        <spr-multivalue-data-table
          [data]="items"
          [addBorder]="addBorder"
          [addZebraStriping]="addZebraStriping"
          [addColFade]="addColFade"
          [pinFirstColumn]="pin"
          >
        </spr-multivalue-data-table>
      </div>
      </div>
    `,
      props: {
        addBorder: boolean('addBorder', true),
        addZebraStriping: boolean('addZebraStriping', false),
        addColFade: boolean('addColFade', true),
        pin: boolean('pinFirstCol', true),
        items: object('items', defaultItems)
      }
    }),
    { notes: { markdown: note } }
  );

