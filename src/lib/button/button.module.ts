import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonLinkComponent } from './button-link/button-link.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    ButtonLinkComponent,
    SubmitButtonComponent
  ],
  exports: [
    ButtonComponent,
    ButtonLinkComponent,
    SubmitButtonComponent
  ]
})
export class ButtonModule {}
