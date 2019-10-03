import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  select,
  boolean,
  text
} from '@storybook/addon-knobs/angular';
import * as note from './switch.component.notes.md';
import { SwitchComponent } from './switch.component';
import { action } from '@storybook/addon-actions';
import { CupcakeSizes } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';

const colors = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
};

const size = {
  default: null,
  xs: CupcakeSizes.xs,
  sm: CupcakeSizes.sm,
  lg: CupcakeSizes.lg
};

storiesOf('Components|Switches', module)
  .addParameters({
    jest: ['switch.component'],
    options: {
      panelPosition: 'bottom'
    }
  })
  .addDecorator(withKnobs)
  .add(
    'Switch',
    () => ({
      moduleMetadata: {
        component: [SwitchComponent],
        declarations: [SwitchComponent]
      },
      component: SwitchComponent,
      template: `
      ${pipeCss}
      <div class="spr-demo-container">
        <spr-switch
          [disabled]="disabled"
          [color]="color"
          [ngModel]="checked"
          [on]="on"
          [off]="off"
          [noText]="noText"
          [size]="size"
          (change)="change($event)">
        </spr-switch>
      </div>
    `,
      props: {
        color: select('color', colors, 'primary'),
        size: select('size', size, null),
        on: text('on text', 'ON'),
        off: text('off text', 'OFF'),
        noText: boolean('no text' , false),
        checked: boolean('checked' , true),
        disabled: boolean('disabled', false),
        change: action('changed')
      }
    }),
    { notes: { markdown: note } }
  );
