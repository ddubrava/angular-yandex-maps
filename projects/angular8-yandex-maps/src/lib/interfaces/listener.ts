import { EventEmitter } from '@angular/core';

export interface Listener {
  /**
   * Event name in Yandex.Maps API
   */
  name: string;
  /**
   * EventEmitter
   */
  emitter: EventEmitter<any>;
  /**
   * If true runs event outside of angular
   */
  runOutsideAngular?: boolean;
}
