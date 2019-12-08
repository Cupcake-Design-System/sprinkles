import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from "@angular/core";
import { SprUpdateHostClassService } from "../utilities/update-host-class.service";

@Component({
  selector: "spr-tag",
  exportAs: "sprTag",
  preserveWhitespaces: false,
  providers: [SprUpdateHostClassService],
  templateUrl: "./spr-tag.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "(click)": "updateCheckedStatus()",
    "[style.background-color]": "presetColor? null : color"
  }
})
export class SprTagComponent implements OnInit, OnChanges {
  presetColor = false;
  @Input() mode: "default" | "closeable" | "checkable" = "default";
  @Input() color: string;
  @Input() checked = false;
  @Input() square = false;
  @Output() readonly afterClose = new EventEmitter<void>();
  @Output() readonly onClose = new EventEmitter<MouseEvent>();
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  private isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return /^(primary|success|warning|danger|cyan|secondary|blue|grape|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
      color
    );
  }

  private updateClassMap(): void {
    this.presetColor = this.isPresetColor(this.color);
    const prefix = "c-badge";
    this.SprUpdateHostClassService.updateHostClass(
      this.elementRef.nativeElement,
      {
        [`${prefix}`]: true,
        [`${prefix}-has-color`]: this.color && !this.presetColor,
        [`${prefix}-${this.color}`]: this.presetColor,
        [`${prefix}-checkable`]: this.mode === "checkable",
        [`${prefix}-square`]: this.square,
        [`${prefix}-checkable-checked`]: this.checked
      }
    );
  }

  updateCheckedStatus(): void {
    if (this.mode === "checkable") {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
      this.updateClassMap();
    }
  }

  closeTag(e: MouseEvent): void {
    this.onClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(
        this.renderer.parentNode(this.elementRef.nativeElement),
        this.elementRef.nativeElement
      );
    }
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private SprUpdateHostClassService: SprUpdateHostClassService
  ) {}

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnChanges(): void {
    this.updateClassMap();
  }
}
