import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent],
  providers: [BreadcrumbsService]
})
export class BreadcrumbsModule {}
