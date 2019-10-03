import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as illionsnote from './illions.notes.md';
import { IllionsPipe } from './illions.pipe';
import { pipeCss } from '../../../common/canvasDisplay';


storiesOf('Pipes', module)
  .addParameters({
    jest: ['./illions.pipe']
  })
  .addDecorator(withKnobs)
  .add(
    'Illions Pipe',
    () => ({
      moduleMetadata: {
        declarations: [IllionsPipe]
      },
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
            <div class="spr-demo-child">
                <p>521548645534548: {{ 521548645534548 | sprIllions : 1 }}</p>
            </div>
        </div>
    `
    }),
    { notes: { markdown: illionsnote } }
  );
