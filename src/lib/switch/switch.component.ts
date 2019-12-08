import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CupcakeFlavors, CupcakeSizes, mixinColor, mixinSize } from "../common";

const CLASS_BASE = "switch";

export class SwitchBase {
  constructor(public renderer: Renderer2) {}
}

export const SwitchMixinBase = mixinSize(
  mixinColor(SwitchBase, CLASS_BASE),
  CLASS_BASE
);

@Component({
  selector: "spr-switch",
  templateUrl: "./switch.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent extends SwitchMixinBase
  implements ControlValueAccessor, AfterViewInit {
  @Input() disabled = false;
  @Input() color: CupcakeFlavors = undefined;
  @Input() size: CupcakeSizes = undefined;
  @Input() on = "ON";
  @Input() off = "OFF";
  @Input() noText: boolean;

  @Input() @HostBinding("tabindex") public tabindex = -1;

  _checked = false;
  get checked() {
    return this._checked;
  }

  @Input("checked") set checked(val) {
    this._checked = val;
    this.onChange(val);
    this.onTouched();
  }

  @ViewChild("mixinRef", { static: true }) mixinRef: ElementRef;

  @ViewChild("inputRef", { static: true }) inputRef: ElementRef;

  constructor(public renderer: Renderer2, public el: ElementRef) {
    super(renderer);
  }

  @HostListener("focus")
  public onHostFocus() {
    this.inputRef.nativeElement.focus();
  }

  ngAfterViewInit() {
    if (!this.color) this.color = CupcakeFlavors.Primary;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

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

  toggle() {
    this.checked = !this.checked;
  }
}
