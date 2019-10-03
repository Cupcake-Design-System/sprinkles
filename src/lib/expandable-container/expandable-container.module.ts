import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableContainerComponent } from './expandable-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExpandableContainerComponent],
  exports: [ExpandableContainerComponent]
})
export class ExpandableContainerModule {}
