import { HasRenderer, Constructor, Mixin } from './constructor';
import { CupcakeFlavors } from '..';

export interface Colorable extends Mixin {
  color: CupcakeFlavors;
  outline: boolean;
}

export function mixinColor<T extends Constructor<HasRenderer>>(
  base: T,
  baseClass: string,
): Constructor<Colorable> & T {
  return class extends base {
    private _outline;
    public get outline() {
      return this._outline;
    }
    public set outline(val) {
      this.updateColorClasses(this.color, val);
    }
    private _color;

    public get color() {
      return this._color;
    }
    public set color(val) {
      this.updateColorClasses(val, this.outline);
    }

    public baseClass = baseClass;

    public mixinRef;

    constructor(...args: any[]) {
      super(...args);
    }

    public updateColorClasses(c, o) {
      // return if no element ref
      if (!this.mixinRef) return;

      // use new color or default
      const cbase = `${this.baseClass}-` || '';

      // use outline or not
      const coutline = o === undefined || o === false ? '' : '-outline';
      // set color if it has changed
      if (c !== this._color || o !== this._outline) {
        // check for outline set
        // remove old color class
        if (this._color) {
          this.renderer.removeClass(this.mixinRef.nativeElement, `c-${cbase}${this._color}${coutline}`);
        }
        // add new color class
        if (c) {
          this.renderer.addClass(this.mixinRef.nativeElement, `c-${cbase}${c}${coutline}`);
        }
        // update old color to new
        this._color = c;
        this._outline = this.outline;
      }
    }
  };
}
