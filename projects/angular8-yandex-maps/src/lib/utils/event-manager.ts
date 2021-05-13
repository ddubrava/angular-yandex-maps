/**
 * Copied from angular/components/google-maps and edited for Yandex Maps API.
 * @see @{link https://github.com/angular/components/blob/master/src/google-maps/map-event-manager.ts}
 */

import { NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface YaEvent<T = any> {
  /**
   * Instance of target
   */
  target: T;
  /**
   * API global object
   */
  ymaps: typeof ymaps;
  /**
   * Provides methods for accessing the originalObject object's fields and methods, with the possibility for redefining them.
   * @see {@link https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Event.html/}
   */
  event: ymaps.Event<any, T>;
}

export type YaReadyEvent<T = any> = Omit<YaEvent<T>, 'event'>;

/**
 * @internal
 */
type EventManagerTarget = {
  events: ymaps.IEventManager;
};

/**
 * Manages event on a Yandex Maps object, ensuring that events are added only when necessary.
 * @internal
 */
export class EventManager {
  /**
   * Listeners that were added before the target was set.
   */
  private _pending: {
    observable: Observable<any>;
    observer: Subscriber<any>;
  }[] = [];

  private _listeners: {
    name: string;
    callback: (e: ymaps.Event) => void;
    manager: ymaps.IEventManager;
  }[] = [];

  private readonly _targetStream = new BehaviorSubject<EventManagerTarget | undefined>(undefined);

  constructor(private readonly _ngZone: NgZone) {}

  /**
   * Gets an observable that adds an event listener to the map when a consumer subscribes to it.
   * @param name
   */
  getLazyEmitter(name: string): Observable<YaEvent> {
    return this._targetStream.pipe(
      switchMap((target) => {
        const observable = new Observable<YaEvent>((observer) => {
          // If the target hasn't been initialized yet, cache the observer so it can be added later.
          if (!target) {
            this._pending.push({ observable, observer });
            return undefined;
          }

          const callback = (event: ymaps.Event) => {
            const e = {
              event,
              target,
              ymaps,
            };

            this._ngZone.run(() => observer.next(e));
          };

          const listener = target.events.add(name, callback);
          this._listeners.push({ name, callback, manager: listener });

          // Unsubscribe function
          return () => listener.remove(name, callback as any);
        });

        return observable;
      }),
    );
  }

  /**
   * Sets the current target that the manager should bind events to.
   * @param target
   */
  setTarget(target: EventManagerTarget): void {
    const currentTarget = this._targetStream.value;

    if (target === currentTarget) {
      return;
    }

    // Clear the listeners from the pre-existing target.
    if (currentTarget) {
      this._clearListeners();
      this._pending = [];
    }

    this._targetStream.next(target);

    // Add the listeners that were bound before the map was initialized.
    this._pending.forEach((subscriber) => subscriber.observable.subscribe(subscriber.observer));

    this._pending = [];
  }

  /**
   * Destroys the manager and clears the event listeners.
   */
  destroy(): void {
    this._clearListeners();
    this._pending = [];
    this._targetStream.complete();
  }

  /**
   * Clears all currently-registered event listeners.
   */
  private _clearListeners() {
    this._listeners.forEach((listener) => {
      const { name, callback, manager } = listener;
      manager.remove(name, callback as any);
    });

    this._listeners = [];
  }
}
