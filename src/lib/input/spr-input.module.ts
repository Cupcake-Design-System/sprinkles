import { PlatformModule } from "@angular/cdk/platform";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { addOnModule } from "../utilities/addon/index";
import { sprInputGroupComponent } from "./spr-input-group.component";
import { SprInputDirective } from "./spr-input.directive";

@NgModule({
  declarations: [SprInputDirective, sprInputGroupComponent],
  exports: [SprInputDirective, sprInputGroupComponent],
  imports: [CommonModule, PlatformModule, addOnModule]
})
export class sprInputModule {}
