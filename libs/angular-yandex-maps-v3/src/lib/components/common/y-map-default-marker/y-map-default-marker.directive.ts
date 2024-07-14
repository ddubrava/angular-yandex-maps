import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YMapDefaultMarker, YMapDefaultMarkerProps } from '@yandex/ymaps3-types/packages/markers';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapDefaultMarker](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/markers/#class-ymapdefaultmarker) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 * This component is from the `@yandex/ymaps3-markers@0.0.1` package, which is asynchronously loaded when you use this component.
 *
 * ```html
 * <y-map
 *   [props]="{
 *     location: {
 *       center: [-0.127696, 51.507351],
 *       zoom: 10,
 *     },
 *   }"
 * >
 *   <y-map-default-scheme-layer />
 *   <y-map-default-features-layer />
 *
 *   <y-map-default-marker
 *     [props]="{
 *       coordinates: [-0.127696, 51.507351],
 *       title: 'Hello World!',
 *       subtitle: 'kind and bright',
 *       color: 'blue',
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-default-marker',
  standalone: true,
})
export class YMapDefaultMarkerDirective implements OnInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();

  private marker?: YMapDefaultMarker;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/en/ref/packages/markers/#YMapDefaultMarkerProps}
   */
  @Input({ required: true }) props!: YMapDefaultMarkerProps;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapDefaultMarker>> = new EventEmitter<
    YReadyEvent<YMapDefaultMarker>
  >();

  constructor(private readonly yMapComponent: YMapComponent) {}

  ngOnInit() {
    this.yMapComponent.map$
      .pipe(
        filter(Boolean),
        switchMap((map) =>
          // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
          from(ymaps3.import('@yandex/ymaps3-markers@0.0.1')).pipe(
            tap(({ YMapDefaultMarker }) => {
              this.marker = new YMapDefaultMarker(this.props);
              map.addChild(this.marker);
              this.ready.emit({ ymaps3, entity: this.marker });
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.marker) {
      this.marker.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
