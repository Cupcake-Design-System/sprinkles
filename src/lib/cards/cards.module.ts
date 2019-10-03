import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardsComponent],
  exports: [CardsComponent]
})
export class CardsModule {}
