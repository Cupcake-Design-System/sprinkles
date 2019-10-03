import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'spr-dropdown-section',
  templateUrl: './dropdown-section.component.html',
  styleUrls: ['./dropdown-section.component.scss']
})
export class DropdownSectionComponent implements OnInit {
  @Input() public headerText: string;
  @Input() @HostBinding('style.height') public height: string;

  @HostBinding('class') classes = 'c-card card-lg c-full-height';

  constructor() { }

  ngOnInit() {
  }

}
