import { storiesOf } from '@storybook/angular';
import {
  withKnobs,
  text,
  boolean
} from '@storybook/addon-knobs/angular';
import * as note from './expandable-container.notes.md';
import { CupcakeFlavors } from '../common';
import { pipeCss } from 'src/common/canvasDisplay';
import { ExpandableContainerComponent } from './expandable-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spr-expandable-container-demo',
  template: `
    <div style="width: 15rem; height: 20rem">
      <spr-expandable-container [expanded]="isExpanded">
        <ng-container title>
          <div (click)="isExpanded = !isExpanded" class="noselect c-p-xs c-text-bold" style="border: 1px solid black">{{headerText}}</div>
        </ng-container>
        <ng-container expanded>
          <div class="c-p-xs" style="max-height: 15rem; overflow-y: scroll">
            {{contentText}}
          </div>
        </ng-container>
      </spr-expandable-container>
    </div>
  `
}) class ExpandableContainerDemoComponent {
  @Input()
  public isExpanded: boolean;
  @Input()
  public headerText: string;
  @Input()
  public contentText: string;
}

const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est ante in nibh mauris cursus. Integer eget aliquet nibh praesent tristique magna sit amet purus. Pulvinar mattis nunc sed blandit libero volutpat. Nulla aliquet enim tortor at auctor. Ut lectus arcu bibendum at varius vel pharetra vel turpis. Nulla aliquet porttitor lacus luctus accumsan. Eget nullam non nisi est sit. Vestibulum lorem sed risus ultricies tristique nulla. Facilisi morbi tempus iaculis urna. Iaculis at erat pellentesque adipiscing. Nunc sed velit dignissim sodales ut eu sem integer vitae. Amet consectetur adipiscing elit ut aliquam purus. Cras adipiscing enim eu turpis egestas pretium.
Lobortis elementum nibh tellus molestie nunc non. Euismod in pellentesque massa placerat duis. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Non quam lacus suspendisse faucibus interdum posuere lorem. Elit sed vulputate mi sit amet mauris. Enim ut sem viverra aliquet eget sit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Orci ac auctor augue mauris augue neque gravida in fermentum. Tincidunt dui ut ornare lectus sit amet. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. At tellus at urna condimentum. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Quis risus sed vulputate odio ut enim blandit. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. In tellus integer feugiat scelerisque varius. At auctor urna nunc id. Ut faucibus pulvinar elementum integer enim neque volutpat. Feugiat scelerisque varius morbi enim. Pretium aenean pharetra magna ac placerat vestibulum. Non tellus orci ac auctor augue mauris augue neque gravida.
Morbi leo urna molestie at. Diam maecenas ultricies mi eget mauris. In fermentum et sollicitudin ac orci. Proin gravida hendrerit lectus a. A diam sollicitudin tempor id eu nisl nunc. Posuere ac ut consequat semper. Arcu risus quis varius quam quisque id diam vel quam. Sit amet dictum sit amet justo donec enim diam. Amet consectetur adipiscing elit duis tristique sollicitudin. Interdum varius sit amet mattis vulputate enim. Sem et tortor consequat id porta nibh venenatis cras. Nullam non nisi est sit amet facilisis magna etiam tempor. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Ornare arcu odio ut sem nulla pharetra. Massa sapien faucibus et molestie ac feugiat sed lectus. Sed blandit libero volutpat sed cras ornare arcu. Vestibulum lorem sed risus ultricies tristique nulla.
In egestas erat imperdiet sed euismod. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Nisl tincidunt eget nullam non nisi est sit. Urna molestie at elementum eu facilisis. Elit sed vulputate mi sit amet mauris commodo quis. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit. Non quam lacus suspendisse faucibus interdum posuere. Enim praesent elementum facilisis leo vel fringilla. Id velit ut tortor pretium viverra suspendisse potenti. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Adipiscing commodo elit at imperdiet dui accumsan sit amet. Enim eu turpis egestas pretium aenean. Eu volutpat odio facilisis mauris. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Duis tristique sollicitudin nibh sit amet commodo nulla. A pellentesque sit amet porttitor eget dolor. Fusce ut placerat orci nulla pellentesque dignissim enim sit.
Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Ac turpis egestas sed tempus urna et pharetra. Integer enim neque volutpat ac tincidunt. Non odio euismod lacinia at quis risus. Habitasse platea dictumst quisque sagittis purus. Id donec ultrices tincidunt arcu non. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Convallis convallis tellus id interdum velit laoreet. Massa sed elementum tempus egestas sed sed risus. Risus nullam eget felis eget nunc. Congue quisque egestas diam in. Nunc vel risus commodo viverra maecenas accumsan lacus. Ut tellus elementum sagittis vitae et leo duis ut. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl.
`;

storiesOf('Layout', module)
  .addParameters({ jest: ['exp.component'] })
  .addDecorator(withKnobs)
  .add(
    'Expandable Container',
    () => ({
      moduleMetadata: {
        imports: [    BrowserModule,
          BrowserAnimationsModule],
        component: ExpandableContainerComponent,
        declarations: [
          ExpandableContainerComponent,
          ExpandableContainerDemoComponent
        ]
      },
      component: ExpandableContainerComponent,
      template: `
      ${pipeCss}
        <div class="spr-demo-container">
          <spr-expandable-container-demo
            [isExpanded]="isExpanded"
            [headerText]="headerText"
            [contentText]="contentText">
          </spr-expandable-container-demo>
        </div>
      `,
      props: {
        isExpanded: boolean('isExpanded', true),
        headerText: text('headerText', 'Expandable Container Header'),
        contentText: text('contentText', sampleText),
      }
    }),
    { notes: { markdown: note } }
  );
