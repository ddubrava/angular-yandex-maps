import {
  Directive,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YMapListener, YMapListenerProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapListener](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymaplistener) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 *
 * ```html
 * <y-map
 *   [props]="{
 *     location: {
 *       center: [-0.127696, 51.507351],
 *       zoom: 9,
 *     },
 *   }"
 * >
 *   <y-map-default-scheme-layer />
 *
 *   <y-map-listener
 *     [props]="{
 *       onClick: onClick,
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-listener',
  standalone: true,
})
export class YMapListenerDirective implements OnInit, OnChanges, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  private listener?: YMapListener;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapListenerProps}
   */
  @Input({ required: true }) props!: YMapListenerProps;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapListener>> = new EventEmitter<
    YReadyEvent<YMapListener>
  >();

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.listener = new ymaps3.YMapListener(this.props);
      map.addChild(this.listener);
      this.ready.emit({ ymaps3, entity: this.listener });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.listener) {
        this.listener.update(changes['props'].currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.listener) {
      this.yMapComponent.map$.value?.removeChild(this.listener);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
