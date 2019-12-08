export type NgClassType = string | string[] | Set<string> | NgClassInterface;

export interface NgClassInterface {
  [klass: string]: any; // tslint:disable-line:no-any
}

import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable()
export class SprUpdateHostClassService {
  private classMap = {};
  readonly renderer: Renderer2;

  updateHostClass(el: HTMLElement, classMap: object): void {
    this.removeClass(el, this.classMap, this.renderer);
    this.classMap = { ...classMap };
    this.addClass(el, this.classMap, this.renderer);
  }

  private removeClass(
    el: HTMLElement,
    classMap: NgClassInterface,
    renderer: Renderer2
  ): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i)) {
        renderer.removeClass(el, i);
      }
    }
  }

  private addClass(
    el: HTMLElement,
    classMap: NgClassInterface,
    renderer: Renderer2
  ): void {
    for (const i in classMap) {
      if (classMap.hasOwnProperty(i) && classMap[i]) {
        renderer.addClass(el, i);
      }
    }
  }

  constructor(rendererFactory2: RendererFactory2) {
    this.renderer = rendererFactory2.createRenderer(null, null);
  }
}
