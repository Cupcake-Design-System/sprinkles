import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean } from '@storybook/addon-knobs/angular';
import * as note from './loader.component.notes.md';
import { LoaderBasicComponent } from './loader-basic/loader-basic.component';
import { LoaderIHSMarkitComponent } from './loader-ihs-markit/loader-ihs-markit.component';
import { pipeCss } from 'src/common/canvasDisplay';


const testLog = e => console.log(e);

storiesOf('Components|Loaders', module)
  .addParameters({ jest: ['loader-component.component'] })
  .addDecorator(withKnobs)
  .add('Basic', () => ({
    moduleMetadata: {
      component: [LoaderBasicComponent],
      declarations: [LoaderBasicComponent],
    },
    component: LoaderBasicComponent,
    template: `
    ${pipeCss}
    <div class="c-d-flex c-flex-column c-justify-space-between c-full-height">
      <div class="c-container">
        <div class="c-row c-justify-center" style="height:100vh;">
          <div class="c-col-12 c-col-sm-8 c-col-md-6 c-col-lg-4 c-d-flex c-flex-column c-justify-center">
            <div class="c-justify-center c-align-items-center">
              <div class="c-d-flex c-flex-column c-align-center">
                <spr-loader-basic diameter="5rem" thickness=".25rem"></spr-loader-basic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    props: {
    },
  }),
  { notes: { markdown: note } }
  );


storiesOf('Components|Loaders', module)
  .addParameters({ jest: ['loader-component.component'] })
  .addDecorator(withKnobs)
  .add('IHS Markit', () => ({
    moduleMetadata: {
      component: [LoaderIHSMarkitComponent],
      declarations: [LoaderIHSMarkitComponent],
    },
    component: LoaderIHSMarkitComponent,
    template: `
    ${pipeCss}
    <div class="c-d-flex c-flex-column c-justify-space-between c-full-height">
      <div class="c-container">
        <div class="c-row c-justify-center" style="height:100vh;">
          <div class="c-col-12 c-col-sm-8 c-col-md-6 c-col-lg-4 c-d-flex c-flex-column c-justify-center">
            <div class="c-justify-center c-align-items-center">
              <div class="c-d-flex c-flex-column c-align-center">
                <spr-loader-ihs-markit diameter="10rem"></spr-loader-ihs-markit>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    props: {
    },
  }),
  { notes: { markdown: note } }
  );
