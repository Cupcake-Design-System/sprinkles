import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from "@angular/core";
import { sizeLDSType } from "./enum";
import { SprInputDirective } from "./spr-input.directive";

@Component({
  selector: "spr-input-group",
  exportAs: "sprInputGroup",
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./spr-input-group.component.html",
  host: {
    "[class.c-input-affixed]": "isAffixWrapper",
    "[class.c-input-group]": "isGroup"
  }
})
export class sprInputGroupComponent implements AfterContentInit {
  @ContentChildren(SprInputDirective) listOfSprInputDirective: QueryList<
    SprInputDirective
  >;
  private _size: sizeLDSType = "default";
  @Input() beforeIcon: string;
  @Input() afterIcon: string;
  @Input() prefixIcon: string;
  @Input() suffixIcon: string;
  @Input() addOnBefore: string | TemplateRef<void>;
  @Input() addOnAfter: string | TemplateRef<void>;
  @Input() prefix: string | TemplateRef<void>;
  @Input() suffix: string | TemplateRef<void>;

  @Input() set size(value: sizeLDSType) {
    this._size = value;
    this.updateChildrenInputSize();
  }

  get size(): sizeLDSType {
    return this._size;
  }

  get isLarge(): boolean {
    return this.size === "large";
  }

  get isSmall(): boolean {
    return this.size === "small";
  }

  get isAffix(): boolean {
    return !!(this.suffix || this.prefix || this.prefixIcon || this.suffixIcon);
  }

  get isAddOn(): boolean {
    return !!(
      this.addOnAfter ||
      this.addOnBefore ||
      this.afterIcon ||
      this.beforeIcon
    );
  }

  get isAffixWrapper(): boolean {
    return this.isAffix && !this.isAddOn;
  }

  get isGroup(): boolean {
    return !this.isAffix && !this.isAddOn;
  }

  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  get isLargeGroupWrapper(): boolean {
    return this.isAddOn && this.isLarge;
  }

  get isLargeAffix(): boolean {
    return this.isAffixWrapper && this.isLarge;
  }

  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  get isSmallAffix(): boolean {
    return this.isAffixWrapper && this.isSmall;
  }

  get isSmallGroupWrapper(): boolean {
    return this.isAddOn && this.isSmall;
  }

  updateChildrenInputSize(): void {
    if (this.listOfSprInputDirective) {
      this.listOfSprInputDirective.forEach(item => (item.size = this.size));
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
  }
}
