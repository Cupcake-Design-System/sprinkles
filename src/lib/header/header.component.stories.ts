import { storiesOf } from '@storybook/angular';
import { withKnobs, object, select } from '@storybook/addon-knobs/angular';
import {
  HeaderComponent,
  HeaderGroup,
  HeaderItem,
  HeaderItemType,
  HeaderFixed,
  HeaderTheme,
  HeaderBackground
} from './header.component';
import * as note from './header.notes.md';
import { HeaderLinkComponent } from './header-link/header-link.component';

export const headerItems: HeaderItem[] = [
  {
    type: HeaderItemType.link,
    group: HeaderGroup.left,
    params: {
      path: '/home',
      imgPath: '../../assets/ipreo-logo-white.png',
      classes: ['c-header-logo']
    }
  },
  {
    type: HeaderItemType.link,
    group: HeaderGroup.left,
    params: { name: 'Left Link', path: '/home' }
  },
  {
    type: HeaderItemType.link,
    group: HeaderGroup.center,
    params: { name: 'Center Link', path: '/home' }
  },
  {
    type: HeaderItemType.link,
    group: HeaderGroup.right,
    params: { name: 'Right Link', path: '/home' }
  }
];

const headerConfig = {
  attachment: HeaderFixed.Fixed,
  theme: HeaderTheme.Default,
  background: HeaderBackground.Default
};

storiesOf('Layout', module)
  .addParameters({
    jest: ['header.component']
  })
  .addDecorator(withKnobs)
  .add(
    'Header',
    () => ({
      moduleMetadata: {
        component: HeaderComponent,
        declarations: [HeaderComponent, HeaderLinkComponent]
      },
      component: HeaderComponent,
      props: {
        headerItems: object('headerItems', headerItems),
        headerConfiguration: object('headerConfiguration', headerConfig)
      }
    }),
    { notes: { markdown: note } }
  );
