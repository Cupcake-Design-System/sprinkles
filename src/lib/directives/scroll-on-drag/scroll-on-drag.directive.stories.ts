import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as notes from './scroll-on-drag.notes.md';
import { pipeCss } from '../../../common/canvasDisplay';
import { DirectivesModule } from '../directives.module';
import { Component } from '@angular/core';
import { ButtonModule } from '../../button';
import { ScrollOnDragDirective } from './scroll-on-drag.directive';

@Component({
  selector: 'spr-scroll-on-drag-demo',
  template: `
    <div style="overflow-y: scroll; height: 25rem" id="scroll-parent" sprScrollOnDrag>
      <div class="c-bg-primary-2 c-p-xs c-m-xs"
        id="drag-item"
        draggable="true"
        style="height: 2rem; width: 15rem; border: 1px solid black; cursor: pointer">
        Drag me up/down
      </div>
      <div id="filler-item-for-scroll-bar" style="height: 40rem"></div>
    </div>
  `
}) class ScrollonDragDemoComponent {
  public numberOfItems;
  constructor() {
    this.numberOfItems = Array(20).fill(0).map((x, i) => i);
  }
}

storiesOf('Directives', module)
  .addParameters({
    jest: ['./scroll-on-drag.directive']
  })
  .add(
    'Scroll On Drag',
    () => ({
      moduleMetadata: {
        imports: [ButtonModule, DirectivesModule],
        component: [ScrollOnDragDirective],
        declarations: [ScrollonDragDemoComponent]
      },
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
          <spr-scroll-on-drag-demo></spr-scroll-on-drag-demo>
        </div>
  `
    }),
    { notes: { markdown: notes } }
  );
