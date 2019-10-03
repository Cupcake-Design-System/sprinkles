import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  select,
  boolean,
  text
} from '@storybook/addon-knobs/angular';
import { ButtonComponent, ButtonLinkComponent, SubmitButtonComponent } from '.';
import * as note from './button.component.notes.md';
import { CupcakeFlavors, CupcakeSizes } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';

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

storiesOf('Components|Buttons', module)
  .addParameters({ jest: ['button.component'] })
  .addDecorator(withKnobs)
  .add(
    'Standard',
    () => ({
      moduleMetadata: {
        component: [ButtonComponent],
        declarations: [ButtonComponent]
      },
      component: ButtonComponent,
      template: `
      ${pipeCss}
      <div class="spr-demo-container">
        <button
          spr-button
          [color]="color"
          [size]="size"
          [disabled]="disabled">
          Standard Button
        </button>
      </div>
    `,
      props: {
        color: select('color', colors, 'primary'),
        size: select('size', size, null),
        disabled: boolean('disabled', false)
      }
    }),
    { notes: { markdown: note } }
  );

storiesOf('Components|Buttons', module)
.addParameters({ jest: ['button.component'] })
.addDecorator(withKnobs)
.add(
  'Outline',
  () => ({
    moduleMetadata: {
      component: [ButtonComponent],
      declarations: [ButtonComponent]
    },
    component: ButtonComponent,
    template: `
      ${pipeCss}
      <div class="spr-demo-container">
      <button
        spr-button
        [color]="color"
        [size]="size"
        [disabled]="disabled"
        [outline]="outline"
        >
        Outline Button
      </button>
    </div>
    `,
    props: {
      color: select('color', colors, 'primary'),
      size: select('size', size, null),
      disabled: boolean('disabled', false),
      outline: boolean('outline', true)
    }
  }),
  { notes: { markdown: note } }
);

storiesOf('Components|Buttons', module)
  .addParameters({ jest: ['submit-button.component'] })
  .addDecorator(withKnobs)
  .add(
    'Submit',
    () => ({
      moduleMetadata: {
        component: [SubmitButtonComponent],
        declarations: [SubmitButtonComponent]
      },
      component: SubmitButtonComponent,
      template: `
        ${pipeCss}
        <div class="spr-demo-container">
          <button
            spr-button
            submit
            [color]="color"
            [size]="size"
            [submittingText]="submittingText"
            [animate]="animate"
            [disabled]="disabled"
            [outline]="outline">
            Submit Button
          </button>
        </div>
      `,
      props: {
        color: select('color', colors, 'primary'),
        size: select('size', size, null),
        submittingText: text('submitting text', 'Submitting'),
        animate: boolean('animate', true),
        disabled: boolean('disabled', false),
        outline: boolean('outline', false)
      }
    }),
    { notes: { markdown: note } }
  );

storiesOf('Components|Buttons', module)
  .addParameters({ jest: ['button-link.component'] })
  .addDecorator(withKnobs)
  .add(
    'Link',
    () => ({
      moduleMetadata: {
        component: [ButtonLinkComponent],
        declarations: [ButtonLinkComponent]
      },
      component: ButtonLinkComponent,
      template: `
        ${pipeCss}
        <div class="spr-demo-container">
          <button
            spr-button
            link
            [color]="color"
            [size]="size"
            [disabled]="disabled">
            Sample Button
          </button>
        </div>
      `,
      props: {
        color: select('color', colors, 'primary'),
        size: select('size', size, null),
        disabled: boolean('disabled', false)
      }
    }),
    { notes: { markdown: note } }
  );

storiesOf('Components|Buttons', module)
  .addParameters({ jest: ['button.component'] })
  .addDecorator(withKnobs)
  .add(
    'Icon',
    () => ({
      moduleMetadata: {
        component: [ButtonComponent],
        declarations: [ButtonComponent]
      },
      component: ButtonComponent,
      template: `
        ${pipeCss}
        <div class="spr-demo-container">
          <button
            spr-button
            icon
            [circle]="circle"
            [color]="color"
            [size]="size"
            [disabled]="disabled"
            [outline]="outline"
            >
            <i class="fas fa-star"></i>
          </button>
        </div>
      `,
      props: {
        color: select('color', colors, 'primary'),
        size: select('size', size, null),
        circle: boolean('circle', false),
        disabled: boolean('disabled', false),
        outline: boolean('outline', false)
      }
    }),
    { notes: { markdown: note } }
  );

