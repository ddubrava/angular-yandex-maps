/**
 * Copied from Taiga UI.
 * https://github.com/taiga-family/taiga-ui/blob/eafb4f498ff57f4a21eebe74aee97a72b5e8d3f8/projects/cdk/observables/zone.ts#L19
 */

import type { NgZone } from '@angular/core';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { Observable } from 'rxjs';

export function enterZone<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) =>
      source.subscribe({
        next: (value) => zone.run(() => subscriber.next(value)),
        error: (error: unknown) => zone.run(() => subscriber.error(error)),
        complete: () => zone.run(() => subscriber.complete()),
      }),
    );
}

export function exitZone<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}
