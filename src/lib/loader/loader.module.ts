import { NgModule } from '@angular/core';
import { LoaderBasicComponent } from './loader-basic/loader-basic.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderBasicComponent],
  exports: [LoaderBasicComponent]
})
export class LoaderModule { }
