import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as containsnote from './contains.notes.md';
import { ContainsPipe } from './contains.pipe';
import { InsertHtmlPipe } from '../insert-html/insert-html.pipe';
import { pipeCss } from '../../../common/canvasDisplay';

storiesOf('Pipes', module)
  .addParameters({
    jest: ['./contains.pipe']
  })
  .addDecorator(withKnobs)
  .add(
    'Contains Pipe',
    () => ({
      moduleMetadata: {
        declarations: [ContainsPipe, InsertHtmlPipe]
      },
      template: `
      ${pipeCss}
      <style>
        .spr-demo-child {
            min-width: 60%;
        }
      </style>
      <div class="spr-demo-container">
        <div class="spr-demo-child">
            <p>Data:</p>
            <pre>{{[
                { name: 'a', test: 't' },
                { name: 'b', test: 'a' },
                { name: 't' }
            ] | json | sprInsertHtml}}</pre>

            <p>All items with 'a' in the name<p>
            <p *ngFor="let item of [
                { name: 'a' },
                { name: 'a', test: 't' },
                { name: 'b', test: 'a' }
            ] | sprContains:'a':'name'">{{item.name}}</p>

            <p>All items with 't' in any property</p>
            <p *ngFor="let item of [
                { name: 'a', test: 't' },
                { name: 'b', test: 'a' },
                { name: 't' }
            ] | sprContains:'t'">{{item.name}}</p>
        </div>
    </div>
  `
    }),
    { notes: { markdown: containsnote } }
  );
