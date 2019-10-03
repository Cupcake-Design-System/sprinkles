import { storiesOf } from '@storybook/angular';
import { withKnobs, select, boolean } from '@storybook/addon-knobs/angular';
import * as note from './checkbox.component.notes.md';
import { CheckboxComponent } from './checkbox.component';
import { action } from '@storybook/addon-actions';
import { CupcakeFlavors, CupcakeSizes } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';

const colors = {
  default: null,
  primary: CupcakeFlavors.Primary,
  success: CupcakeFlavors.Success,
  warning: CupcakeFlavors.Warning,
  danger: CupcakeFlavors.Danger
};

const size = {
  default: null,
  sm: CupcakeSizes.sm,
  lg: CupcakeSizes.lg,
  xl: CupcakeSizes.xl
};

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

storiesOf('Components|Forms', module)
  .addParameters({ jest: ['checkbox.component'] })
  .addDecorator(withKnobs)
  .add('Checkbox', () => ({
    moduleMetadata: {
      component: [CheckboxComponent],
      declarations: [CheckboxComponent],
    },
    component: CheckboxComponent,
    template: `
      ${pipeCss}
      <div class="spr-demo-container">
        <spr-checkbox
          [checked]="true"
          [disabled]="disabled"
          [size]="size"
          [color]="color"
          (change)="change($event)">
          Label
        </spr-checkbox>
      </div>
    `,
    props: {
      color: select('color', colors, null),
      size: select('size', size, null),
      disabled: boolean('disabled', false),
      change: action('changed')
    },
  }),
  { notes: { markdown: note } }
  );

