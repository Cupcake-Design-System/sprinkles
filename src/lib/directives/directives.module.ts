import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupDirective } from './popup/popup.directive';
import { TabOrderDirective } from './tab-order/tab-order.directive';
import { ScrollOnDragDirective } from './scroll-on-drag/scroll-on-drag.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [
    PopupDirective,
    TabOrderDirective,
    ScrollOnDragDirective
  ],
  exports: [
    PopupDirective,
    TabOrderDirective,
    ScrollOnDragDirective
  ]
})
export class DirectivesModule {}
