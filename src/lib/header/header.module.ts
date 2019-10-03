import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderLinkComponent } from './header-link/header-link.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, HeaderLinkComponent],
  exports: [HeaderComponent, HeaderLinkComponent]
})
export class HeaderModule {}
