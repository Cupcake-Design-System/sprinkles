import { Renderer2, ElementRef, AfterViewInit } from '@angular/core';

export type Constructor<T> = new (...args: any[]) => T;

export interface HasRenderer {
  renderer: Renderer2;
}

export interface Mixin extends HasRenderer {
  baseClass: string;
  mixinRef: ElementRef;
}
