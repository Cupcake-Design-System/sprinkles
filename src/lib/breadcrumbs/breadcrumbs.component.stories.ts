import { storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs/angular';
import * as note from './breadcrumbs.component.notes.md';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';

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

const mocknav: NavigationEnd = {
  id: 1,
  urlAfterRedirects: 'story/elements--breadcrumbs',
  url: 'story'
};

storiesOf('Components|Breadcrumbs', module)
  .addParameters({ jest: ['breadcrumbs.component'] })
  .addDecorator(withKnobs)
  .add('Breadcrumbs', () => ({
    moduleMetadata: {
      component: [BreadcrumbsComponent],
      declarations: [BreadcrumbsComponent],
      providers: [
        BreadcrumbsService,
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(mocknav.id, mocknav.url, mocknav.urlAfterRedirects)),
            navigateByUrl: (url) => {}
          }
        }
      ]
    },
    component: BreadcrumbsComponent,
    template: `
      ${css}
      <div class="spr-demo-container">
        <spr-breadcrumbs [prefix]="prefix">
        </spr-breadcrumbs>
      </div>
    `,
    props: {
      prefix: text('prefix', 'prefix')
    },
  }),
  { notes: { markdown: note } }
  );
