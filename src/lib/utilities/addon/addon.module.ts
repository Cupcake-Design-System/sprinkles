import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { classListAddDirective } from "./classlist_add";
import { stringTemplateOutletDirective } from "./string_template_outlet";

@NgModule({
  imports: [CommonModule],
  exports: [stringTemplateOutletDirective, classListAddDirective],
  declarations: [stringTemplateOutletDirective, classListAddDirective]
})
export class addOnModule {}
