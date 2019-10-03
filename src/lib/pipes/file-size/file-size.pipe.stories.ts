import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as filesizenote from './file-size.notes.md';
import { InsertHtmlPipe } from '../insert-html/insert-html.pipe';
import { pipeCss } from '../../../common/canvasDisplay';
import { FileSizePipe } from './/file-size.pipe';

storiesOf('Pipes', module)
  .addParameters({
    jest: ['./file-size.pipe']
  })
  .addDecorator(withKnobs)
  .add(
    'File Size Pipe',
    () => ({
      moduleMetadata: {
        declarations: [FileSizePipe, InsertHtmlPipe]
      },
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
            <div class="spr-demo-child">
                <p>512: {{ 512 | sprFileSize }}</p>
                <p>10240: {{ 10240 | sprFileSize }}</p>
                <p>2097152: {{ 2097152 | sprFileSize }}</p>
            </div>
        </div>
  `
    }),
    { notes: { markdown: filesizenote } }
  );
