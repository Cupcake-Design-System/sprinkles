import { NgModule } from '@angular/core';
import { TemplateDirective } from './directives/template.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [TemplateDirective],
  exports: [TemplateDirective]
})
export class SprCommonModule { }
