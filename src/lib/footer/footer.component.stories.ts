import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  text,
  boolean,
  object
} from '@storybook/addon-knobs/angular';

import * as note from './footer.notes.md';

import { FooterComponent } from './footer.component';

const css = `
<style>
.c-footer {
  bottom: 0;
  position: absolute;
}
</style>
`;

storiesOf('Layout', module)
  .addParameters({
    jest: ['footer.component']
  })
  .addDecorator(withKnobs)
  .add(
    'Footer',
    () => ({
      moduleMetadata: {
        component: FooterComponent,
        declarations: [FooterComponent]
      },
      component: FooterComponent,
      template: `
      ${css}
      <spr-footer
        [transparentFooter]="transparentFooter"
        [companyName]="companyName"
        [footerLinks]="footerLinks"
    ></spr-footer>
      `,
      props: {
        transparentFooter: boolean('transparentFooter', false),
        companyName: text('companyName', 'Ipreo by IHS Markit'),
        footerLinks: object('footerLinks', [
          {
            name: 'Link One',
            type: 'link',
            path: '/footer'
          },
          {
            name: 'Link Two',
            type: 'link',
            path: '/footer'
          },
          {
            name: 'Link Three',
            type: 'event',
            event: () => {
              console.log('you did it!');
            }
          }
        ])
      }
    }),
    { notes: { markdown: note } }
  );
