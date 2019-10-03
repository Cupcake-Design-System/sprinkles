import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  select,
  boolean,
  text,
  color
} from '@storybook/addon-knobs/angular';
import * as note from './avatar.component.notes.md';
import { AvatarComponent } from './avatar.component';
import { CupcakeSizes, CupcakeFlavors } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';

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
  lg: CupcakeSizes.lg,
  xl: CupcakeSizes.xl,
};



storiesOf('Components|Avatar', module)
.addDecorator(withKnobs)
.addParameters({ jest: ['avatar.component'] })
.add('Icon', () => ({
  moduleMetadata: {
    component: [AvatarComponent],
    declarations: [AvatarComponent],
    providers: [
    ]
  },
  component: AvatarComponent,
  template: `
  ${pipeCss}
  <div class="spr-demo-container">
    <spr-avatar
      [icon]="icon"
      [color]="color"
      [size]="size">
    </spr-avatar>
  </div>
  `,
  props: {
    color: select('Color', bgColors, 'primary'),
    icon: text('Icon', 'fas fa-robot'),
    size: select('Size', size, 'lg')
  },
}),
{ notes: { markdown: note } }
);

storiesOf('Components|Avatar', module)
.addDecorator(withKnobs)
.addParameters({ jest: ['avatar.component'] })
.add('Initials', () => ({
  moduleMetadata: {
    component: [AvatarComponent],
    declarations: [AvatarComponent],
    providers: [
    ]
  },
  component: AvatarComponent,
  template: `
  ${pipeCss}
  <div class="spr-demo-container">
    <spr-avatar
      [initials]="initials"
      [color]="color"
      [size]="size">
    </spr-avatar>
  </div>
  `,
  props: {
    color: select('Background', bgColors, 'primary'),
    initials: text('Initials', 'JE'),
    size: select('Size', size, 'default')
  },
}),
{ notes: { markdown: note } }
);


storiesOf('Components|Avatar', module)
.addDecorator(withKnobs)
.addParameters({ jest: ['avatar.component'] })
.add('Image', () => ({
  moduleMetadata: {
    component: [AvatarComponent],
    declarations: [AvatarComponent],
    providers: [
    ]
  },
  component: AvatarComponent,
  template: `
  ${pipeCss}
  <div class="spr-demo-container">
    <spr-avatar
      [src]="img"
      [size]="size">
    </spr-avatar>
  </div>
  `,
  props: {
    img: text('Image', 'https://unsplash.it/200?image=433'),
    size: select('Size', size, 'lg'),
  },
}),
{ notes: { markdown: note } }
);
