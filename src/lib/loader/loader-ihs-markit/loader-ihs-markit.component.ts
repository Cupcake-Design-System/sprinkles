import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'spr-loader-ihs-markit',
  template: `
    <div class="bg-svg" [ngStyle]="{width: diameter, height: diameter}"></div>
  `,
  styleUrls: ['./loader-ihs-markit.component.scss']
})
export class LoaderIHSMarkitComponent {
  @Input() diameter = '10rem';

  public params: any;

  agInit(params): void {
    this.params = params;
  }

}
