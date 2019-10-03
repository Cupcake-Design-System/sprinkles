import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { CupcakeFlavors } from '../common/types';

@Component({
  selector: 'spr-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() public headerLinkHref: string;

  @Input() public headerText: string;

  @Input() public draggable = false;

  @Input()
  public loading = false;

  @Input()
  public flavor: CupcakeFlavors = CupcakeFlavors.Default;

  @Input()
  @HostBinding('style.height')
  public height: string;

  @HostBinding('class')
  classes;

  ngOnInit() {
    this.classes = `c-card card-lg c-full-height c-card-${this.flavor}`;
  }
}
