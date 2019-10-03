import { HasRenderer, Constructor, Mixin } from './constructor';
import { CupcakeSizes } from '..';
import { ElementRef, AfterViewInit } from '@angular/core';

export interface Resizable extends Mixin {
  size: CupcakeSizes;
}

export function mixinSize<T extends Constructor<HasRenderer>>(
  base: T,
  baseClass: string,
  useBaseAsDefault?: boolean
): Constructor<Resizable> & T {
  return class extends base implements AfterViewInit {
    private _size;
    public get size() {
      return this._size;
    }
    public set size(val) {
      this.updateSizeClasses(val);
    }
    public baseClass = baseClass;
    public mixinRef;

    private useBaseAsDefault = useBaseAsDefault;

    constructor(...args: any[]) {
      super(...args);
    }

    public ngAfterViewInit(): void {
      // attempt to update element after view init
      this.updateSizeClasses(this.size);
    }

    private updateSizeClasses(size) {
      // return if no element ref
      if (!this.mixinRef) return;

      // some cupcake components require the base class when there no size
      if (!size && this.useBaseAsDefault) {
        this.renderer.addClass(this.mixinRef.nativeElement, `c-${baseClass}`);
        return;
      }

      const cbase = `${baseClass}-`;

      // set size if it has changed
      if (size !== this._size) {
        // remove old size class
        if (this._size) {
          // this.renderer.removeClass(this.elementRef.nativeElement, `c-${cbase}${this._size}`);
        }
        // add new size class
        if (size) {
          this.renderer.addClass(this.mixinRef.nativeElement, `c-${cbase}${size}`);
        }
        // update old size
        this._size = size;
      }
    }
  };
}
