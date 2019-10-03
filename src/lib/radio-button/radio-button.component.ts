import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinColor, CupcakeFlavors, mixinSize, CupcakeSizes } from '../common';

const CLASS_BASE = 'radio';

export class RadioButtonBase {
  constructor(public renderer: Renderer2) { }
}

export const RadioMixinBase = mixinSize(mixinColor(RadioButtonBase, CLASS_BASE), CLASS_BASE);

@Component({
  selector: 'spr-radio-button',
  templateUrl: './radio-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent extends RadioMixinBase implements ControlValueAccessor, AfterViewInit {
  @Input()
  name;
  @Input()
  color: CupcakeFlavors = undefined;
  @Input()
  size: CupcakeSizes = undefined;
  @Input()
  disabled = false;

  _checked = false;
  get checked() {
    return this._checked;
  }
  @Input('checked')
  set checked(val) {
    this._checked = val;
    this.onChange(val);
    this.onTouched();
  }

  @ViewChild('mixinRef') mixinRef: ElementRef;

  constructor(public renderer: Renderer2) {
    super(renderer);
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngAfterViewInit() {
    if (!this.color) this.color = CupcakeFlavors.Primary;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value != null) {
      this.checked = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  change(event) {
    const target = event.target;
    if (target.checked)
      this.checked = target.checked;
  }
}
