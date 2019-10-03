import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  select,
  boolean,
  text,
  color
} from '@storybook/addon-knobs/angular';
import * as note from './badge.component.notes.md';
import { BadgeComponent } from './badge.component';
// import { AvatarComponent } from '../avatar/avatar.component';
import { CupcakeSizes, CupcakeFlavors } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';
import { AvatarComponent } from 'src/lib/avatar';


const bgColors = {
  default: null,
  primary: CupcakeFlavors.Primary,
  secondary: CupcakeFlavors.Secondary,
  success: CupcakeFlavors.Success,
  warning: CupcakeFlavors.Warning,
  danger: CupcakeFlavors.Danger
};

const size = {
  default: null,
  sm: CupcakeSizes.sm,
  lg: CupcakeSizes.lg
};

storiesOf('Components|Badges', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    moduleMetadata: {
      component: [BadgeComponent],
      declarations: [BadgeComponent],
      providers: [
      ]
    },
    component: BadgeComponent,
    template: `
    ${pipeCss}
    <div class="spr-demo-container">
      <spr-badge
        [color]="color"
        [size]="size">
        {{label}}
      </spr-badge>
    </div>
    `,
    props: {
      label: text('Text', 'Badge'),
      size: select('Size', size, 'lg'),
      color: select('color', bgColors, 'primary'),
    },
  }),
    { notes: { markdown: note } }
  );

storiesOf('Components|Badges', module)
  .addDecorator(withKnobs)
  .add('Icon', () => ({
    moduleMetadata: {
      component: [BadgeComponent],
      declarations: [BadgeComponent],
      providers: [
      ]
    },
    component: BadgeComponent,
    template: `
    ${pipeCss}
    <div class="spr-demo-container">
      <spr-badge
        [color]="color"
        [size]="size"
        [icon]="icon">
        {{label}}
      </spr-badge>
    </div>
    `,
    props: {
      label: text('Text', 'Badge'),
      icon: text('Icon', 'fas fa-robot'),
      color: select('Color', bgColors, 'primary'),
      size: select('Size', size, 'lg')
    },
  }),
    { notes: { markdown: note } }
  );
