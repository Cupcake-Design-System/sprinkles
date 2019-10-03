import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as notes from './tab-order.notes.md';
import { pipeCss } from '../../../common/canvasDisplay';
import { DirectivesModule } from '../directives.module';
import { Component } from '@angular/core';
import { ButtonModule } from '../../button';

@Component({
  selector: 'spr-tab-order-directive-demo',
  template: `
    <button class="c-m-right-sm" spr-button sprTabOrder tab-prev="btn2" tab-next="btn2" id="btn1">button1</button>
    <button class="c-m-right-sm" spr-button>Skip Focus</button>
    <button spr-button sprTabOrder tab-prev="btn1" tab-next="btn1" id="btn2">button2</button>
  `
})
class PopupDirectiveTestComponent {}

storiesOf('Directives', module)
  .addParameters({
    jest: ['./tab-order.directive']
  })
  .addDecorator(withKnobs)
  .add(
    'Tab Order',
    () => ({
      moduleMetadata: {
        imports: [ButtonModule, DirectivesModule],
        component: [PopupDirectiveTestComponent],
        declarations: [PopupDirectiveTestComponent]
      },
      // component: ButtonComponent,
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
          <spr-tab-order-directive-demo></spr-tab-order-directive-demo>
        </div>
  `
    }),
    { notes: { markdown: notes } }
  );
