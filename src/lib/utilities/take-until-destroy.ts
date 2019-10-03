import { OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const destroyedSubject = Symbol();

/**
 * Automatically completes an observable on destroy
 * ngOnDestroy must be present on component to work correctly
 */
export function takeUntilDestroy<T>(component: OnDestroy) {
  if (component[destroyedSubject] != null) {
    return takeUntil<T>(component[destroyedSubject]);
  }

  const destroyed$ = new Subject();

  let original = component.ngOnDestroy;
  if (original == null || typeof original !== 'function') {
    throw new Error('Adding ngOnDestroy hook in runtime is unreliable. Please, add ngOnDestroy hook in code.');
  }

  component.ngOnDestroy = function() {
    destroyed$.next(true);
    destroyed$.complete();

    original.apply(this, arguments);
    original = null;
  };

  component[destroyedSubject] = destroyed$;

  return takeUntil<T>(destroyed$);
}
