import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { addOnModule } from "../utilities/addon/index";
import { NzSwitchComponent } from "./nz-switch.component";

@NgModule({
  exports: [NzSwitchComponent],
  declarations: [NzSwitchComponent],
  imports: [CommonModule, addOnModule]
})
export class NzSwitchModule {}
