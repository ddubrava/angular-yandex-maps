import { EventEmitter } from '@angular/core';

export interface Listener {
  name: string;
  emitter: EventEmitter<any>;
  runOutsideAngular?: boolean;
}
