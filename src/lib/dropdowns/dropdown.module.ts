import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSectionComponent } from './dropdown-section/dropdown-section.component';
import { DropdownSectionedComponent } from './dropdown-sectioned/dropdown-sectioned.component';
import { DropdownSectionOptionComponent } from './dropdown-section-option/dropdown-section-option.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ButtonModule } from '../button/button.module';
import { SprCommonModule } from '../common/spr-common.module';

@NgModule({
  imports: [ ButtonModule, CommonModule, ClickOutsideModule, SprCommonModule ],
  declarations: [
    DropdownSectionComponent,
    DropdownSectionedComponent,
    DropdownSectionOptionComponent
  ],
  exports: [
    DropdownSectionComponent,
    DropdownSectionedComponent,
    DropdownSectionOptionComponent
  ]
})
export class DropdownModule {}
