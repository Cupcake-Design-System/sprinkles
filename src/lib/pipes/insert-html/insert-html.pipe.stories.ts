import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as insertHtmlnote from './insert-html.notes.md';
import { InsertHtmlPipe } from './insert-html.pipe';
import { pipeCss } from '../../../common/canvasDisplay';

storiesOf('Pipes', module)
  .addParameters({
    jest: ['./insert-html.pipe']
  })
  .addDecorator(withKnobs)
  .add(
    'Insert Html Pipe',
    () => ({
      moduleMetadata: {
        declarations: [InsertHtmlPipe]
      },
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
            <div class="spr-demo-child">
            <pre>{{[
              'here', 'is', 'an', 'array', 'that', 'looks', 'like', 'an', 'array'
          ] | json | sprInsertHtml}}</pre>
            </div>
        </div>
    `
    }),
    { notes: { markdown: insertHtmlnote } }
  );
