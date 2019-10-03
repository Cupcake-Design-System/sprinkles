import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spr-dropdown-section-option',
  templateUrl: './dropdown-section-option.component.html',
  styleUrls: ['./dropdown-section-option.component.scss']
})
export class DropdownSectionOptionComponent implements OnInit {

  @Input() showIcon = false;
  @Input() text = 'Option 1';
  @Input() id: '';
  @Input() index = 0;
  @Input() isFocus = false;
  @Input() showIdOnHover = false;

  public get optionId() {
    return this.text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      // tslint:disable-next-line: triple-equals
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
