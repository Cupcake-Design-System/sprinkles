import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SprTagComponent } from "./spr-tag.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SprTagComponent],
  exports: [SprTagComponent]
})
export class SprTagModule {}
