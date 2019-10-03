import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs/angular';
import * as notes from './popup.notes.md';
import { pipeCss } from '../../../common/canvasDisplay';
import { IPopup, PopupSettings } from './popup.directive';
import { DirectivesModule } from '../directives.module';
import { Component } from '@angular/core';
import { ButtonModule } from '../../button';

@Component({
  selector: 'spr-popup-directive-demo',
  template: `
  <button spr-button [sprPopup]="popupConfig">Click Me</button>
  `
})
class PopupDirectiveTestComponent {
  popupConfig: IPopup = {
    name: 'Test Popup',
    url: 'http://www.ipreo.com',
    settings: PopupSettings.defaultSettings
  };
}

storiesOf('Directives', module)
  .addParameters({
    jest: ['./popup.directive']
  })
  .addDecorator(withKnobs)
  .add(
    'Popup',
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
          <spr-popup-directive-demo></spr-popup-directive-demo>
        </div>
  `
    }),
    { notes: { markdown: notes } }
  );
