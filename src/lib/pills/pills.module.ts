import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PillBlockComponent } from './pill-block/pill-block.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PillBlockComponent
  ],
  exports: [
    PillBlockComponent
  ]
})
export class PillsModule { }
