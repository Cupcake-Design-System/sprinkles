import { Component, OnInit, Input, HostBinding } from '@angular/core';

export declare type MenuDropdownTypeOptions = 'event' | 'link';

export interface FooterLinks {
  type: MenuDropdownTypeOptions;
  name: string;
  path?: string;
  event?: any;
}

@Component({
  selector: 'spr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  public transparentFooter = false;

  @Input()
  public footerLinks: FooterLinks[] = [];

  @Input()
  public companyName: string;

  @HostBinding('class')
  classes;

  public copyrightYear = new Date().getFullYear();

  public onFooterLinkClick(callback) {
    callback();
  }

  ngOnInit() {
    this.classes = this.transparentFooter
      ? 'c-footer-transparent c-footer'
      : 'c-footer';
  }
}
