import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean } from '@storybook/addon-knobs/angular';
import * as note from './radio-button.component.notes.md';
import { RadioButtonComponent } from './radio-button.component';
import { CupcakeSizes } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';

const colors = {
  default: null,
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
};

const size = {
  default: null,
  sm: CupcakeSizes.sm,
  lg: CupcakeSizes.lg,
  xl: CupcakeSizes.xl
};

const testLog = e => console.log(e);

storiesOf('Components|Forms', module)
  .addParameters({ jest: ['radio-button.component'] })
  .addDecorator(withKnobs)
  .add('Radio Button', () => ({
    moduleMetadata: {
      component: [RadioButtonComponent],
      declarations: [RadioButtonComponent],
    },
    component: RadioButtonComponent,
    template: `
    ${pipeCss}
      <div class="spr-demo-container">
        <spr-radio-button
          name="group1"
          [checked]="true"
          [disabled]="disabled"
          [color]="color"
          [size]="size"
          (change)="change($event)">
          Label 1
        </spr-radio-button>
        <spr-radio-button
          name="group1"
          [checked]="false"
          [disabled]="disabled"
          [color]="color"
          [size]="size"
          (change)="change($event)">
          Label 2
        </spr-radio-button>
        <spr-radio-button
          name="group1"
          [checked]="false"
          [disabled]="disabled"
          [color]="color"
          [size]="size"
          (change)="change($event)">
          Label 3
        </spr-radio-button>
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

