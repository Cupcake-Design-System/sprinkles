import { NgModule } from '@angular/core';
import { MultivalueDataTableComponent } from './multivalue-data-table/multivalue-data-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    MultivalueDataTableComponent
  ],
  exports: [
    MultivalueDataTableComponent
  ]
})
export class DataModule {}
