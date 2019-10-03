import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'spr-loader-basic',
  template: `
    <div class="spr-loader-overlay">
      <div class="spr-loader" [ngStyle]="{width: diameter, height: diameter, 'border-width': thickness}"></div>
    </div>
  `,
  styleUrls: ['./loader-basic.component.scss']
})
export class LoaderBasicComponent {
  @Input() diameter = '6rem';
  @Input() thickness = '.3rem';

  public params: any;

  agInit(params): void {
    this.params = params;
  }

}
