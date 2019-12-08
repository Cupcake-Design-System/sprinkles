import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CupcakeFlavors, CupcakeSizes, mixinColor, mixinSize } from "../common";

const CLASS_BASE = "checkbox";

export class CheckboxBase {
  constructor(public renderer: Renderer2) {}
}

export const CheckboxMixinBase = mixinSize(
  mixinColor(CheckboxBase, CLASS_BASE),
  CLASS_BASE
);

@Component({
  selector: "spr-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends CheckboxMixinBase
  implements ControlValueAccessor, AfterViewInit {
  @Input() disabled = false;
  @Input() color: CupcakeFlavors = undefined;
  @Input() size: CupcakeSizes = undefined;

  _checked = false;
  get checked() {
    return this._checked;
  }
  @Input("checked") set checked(val) {
    if (this._checked === val) {
      return;
    }

    this._checked = val;
    this.onChange(val);
    this.onTouched();
  }

  @ViewChild("mixinRef", { static: true }) mixinRef: ElementRef;
  constructor(
    public renderer: Renderer2,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    super(renderer);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

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
      this._checked = value;
      this.changeDetector.markForCheck();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    this.checked = !this.checked;
  }
}
