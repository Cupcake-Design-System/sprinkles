import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from "@angular/cdk/keycodes";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type SizeType = "default" | "small";

@Component({
  selector: "nz-switch",
  exportAs: "nzSwitch",
  preserveWhitespaces: false,
  templateUrl: "./nz-switch.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSwitchComponent),
      multi: true
    }
  ],
  host: {
    "(click)": "hostClick($event)"
  },
  styles: [
    `
      nz-switch {
        display: inline-block;
      }
    `
  ]
})
export class NzSwitchComponent implements ControlValueAccessor, AfterViewInit {
  checked = false;
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild("switchElement", { static: true })
  private switchElement: ElementRef;
  @Input() nzLoading = false;
  @Input() nzDisabled = false;
  @Input() nzControl = false;
  @Input() checkedChildren: string | TemplateRef<void>;
  @Input() nzUnCheckedChildren: string | TemplateRef<void>;
  @Input() size: SizeType;

  hostClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this.nzDisabled && !this.nzLoading && !this.nzControl) {
      this.updateValue(!this.checked);
    }
  }

  updateValue(value: boolean): void {
    if (this.checked !== value) {
      this.checked = value;
      this.onChange(this.checked);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (!this.nzControl && !this.nzDisabled && !this.nzLoading) {
      if (e.keyCode === LEFT_ARROW) {
        this.updateValue(false);
        e.preventDefault();
      } else if (e.keyCode === RIGHT_ARROW) {
        this.updateValue(true);
        e.preventDefault();
      } else if (e.keyCode === SPACE || e.keyCode === ENTER) {
        this.updateValue(!this.checked);
        e.preventDefault();
      }
    }
  }

  blur(): void {
    this.switchElement.nativeElement.blur();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {}

  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }
}
