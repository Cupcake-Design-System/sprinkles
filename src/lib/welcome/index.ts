import { storiesOf, moduleMetadata } from '@storybook/angular';
import { WelcomeComponent } from './welcome.component';

storiesOf('Welcome', module).add('Introduction', () => ({
  template: `<spr-welcome-component></spr-welcome-component>`,
  moduleMetadata: {
    declarations: [WelcomeComponent],
  },
}),
{ options: { showPanel: true } }
);
