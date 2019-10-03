import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sprTemplate]'
})
export class TemplateDirective {
  @Input('sprTemplate')
  public name: string;

  constructor(public readonly template: TemplateRef<any>) { }
}
