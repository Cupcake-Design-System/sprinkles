import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  object,
  select,
  boolean,
  text
} from '@storybook/addon-knobs/angular';

import { action } from '@storybook/addon-actions';
import * as note from './dropdown.component.notes.md';
import { DropdownSectionedComponent, GroupedOptions } from './dropdown-sectioned/dropdown-sectioned.component';
import { DropdownSectionComponent } from './dropdown-section/dropdown-section.component';
import { DropdownSectionOptionComponent } from './dropdown-section-option/dropdown-section-option.component';
import { CupcakeFlavors, CupcakeSizes, CupcakeDirections } from '../common';
import { ButtonComponent } from '../button';
import { pipeCss } from 'src/common/canvasDisplay';
import { ClickOutsideModule } from 'ng-click-outside';

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

export const defaultItems: GroupedOptions[] = [
    {
    groupName: 'GROUP 1',
    options: [{
      text: 'Option 1',
      id: '1-1'
    },
    {
      text: 'Option 2',
      id: '1-2'
    }
    ]
  },
  {
    groupName: 'GROUP 2',
    options: [{
      text: 'Option 2-1',
      id: '2-1'
    },
    {
      text: 'Option 2-2 has long text value',
      id: '2-2'
    }
    ]
  }];

storiesOf('Components|Dropdowns', module)
  .addParameters({ jest: ['dropdown-sectioned.component'] })
  .addDecorator(withKnobs)
  .add(
    'Sectioned',
    () => ({
      moduleMetadata: {
        imports: [ClickOutsideModule],
        component: [DropdownSectionedComponent],
        declarations: [DropdownSectionedComponent, DropdownSectionComponent, DropdownSectionOptionComponent, ButtonComponent]
      },
      component: DropdownSectionedComponent,
      template: `
      ${pipeCss}
      <div class="spr-demo-container">
        <spr-dropdown-sectioned
            [color]="color"
            [outline]="outline"
            [size]="size"
            [disabled]="disabled"
            [items]="items"
            [selectedOptionId]="selectedOptionId"
            [panelDirection]="direction"
            [showIdOnHover]="showIdOnHover">
        </spr-dropdown-sectioned>
      </div>
    `,
      props: {
        color: select('color', colors, 'primary'),
        outline: boolean('outline', false),
        size: select('size', size, null),
        direction: select('direction', directions, 'below'),
        disabled: boolean('disabled', false),
        showIdOnHover: boolean('showIdOnHover', false),
        selectedOptionId: text('selectedOptionId', ''),
        items: object('items', defaultItems)
      }
    }),
    { notes: { markdown: note } }
  );

