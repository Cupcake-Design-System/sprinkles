import { Component, HostBinding, Input } from '@angular/core';
import { HeaderLinkParams } from '../header.component';

@Component({
  selector: 'spr-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.scss']
})
export class HeaderLinkComponent {
  @Input()
  public params: any;

  @HostBinding('class.c-header-item')
  item = true;
}
