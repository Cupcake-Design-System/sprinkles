import { NgModule } from '@angular/core';
import { SearchSelectPanelComponent } from './search-select-panel/search-select-panel.component';
import { LoaderModule } from '../loader/loader.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RichMultiselectPanelComponent } from './rich-multiselect-panel/rich-multiselect-panel.component';
import { PillsModule } from '../pills/pills.module';
import { RichMultiselectActionComponent } from './rich-multiselect-panel/rich-multiselect-action/rich-multiselect-action.component';
import { ButtonModule } from '../button/button.module';
import { SprCommonModule } from '../common/spr-common.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { SelectPanelItemsComponent } from './search-select-panel/select-panel-items/select-panel-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoaderModule,
    PillsModule,
    ButtonModule,
    SprCommonModule,
    CheckboxModule
  ],
  declarations: [
    SearchSelectPanelComponent,
    RichMultiselectActionComponent,
    RichMultiselectPanelComponent,
    SelectPanelItemsComponent
  ],
  exports: [
    SearchSelectPanelComponent,
    RichMultiselectPanelComponent
  ]
})
export class SelectorsModule { }
