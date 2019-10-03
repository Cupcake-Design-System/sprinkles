import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as highlightnote from './highlight.notes.md';
import { HighlightPipe } from './highlight.pipe';
import { pipeCss } from '../../../common/canvasDisplay';

storiesOf('Pipes', module)
  .addParameters({
    jest: ['./highlight.pipe']
  })
  .addDecorator(withKnobs)
  .add(
    'Highlight Pipe',
    () => ({
      moduleMetadata: {
        declarations: [HighlightPipe]
      },
      template: `
      ${pipeCss}
      <div class="spr-demo-container">
        <div class="spr-demo-child">
            <div [innerHtml]="'Sample long text' | sprHighlight: 'ampl'"></div>
            <div [innerHtml]="'Sample long text' | sprHighlight: 'sam'"></div>
        </div>
      </div>
      `
    }),
    { notes: { markdown: highlightnote } }
  );
