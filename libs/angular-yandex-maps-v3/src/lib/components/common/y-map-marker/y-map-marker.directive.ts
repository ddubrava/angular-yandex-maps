import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YMapMarker, YMapMarkerProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapMarker](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymapmarker) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments. `YMapMarker['element']` can only be projected, see the example below.
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
 *   <y-map-default-features-layer />
 *
 *   <y-map-marker
 *     [props]="{
 *       coordinates: [-0.127696, 51.507351],
 *       draggable: true,
 *     }"
 *   >
 *     <img
 *       width="64"
 *       height="64"
 *       style="border-radius: 50%"
 *       src="https://cdn.openart.ai/published/nI5hC8sFzqKnKbJtW1hA/ExVfxYNJ_E0Yh_256.webp"
 *       alt="Bulldog"
 *     />
 *   </y-map-marker>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-marker',
  standalone: true,
})
export class YMapMarkerDirective implements AfterViewInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();

  private marker?: YMapMarker;

  private element?: HTMLElement;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapMarkerProps}
   */
  @Input({ required: true }) props!: YMapMarkerProps;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapMarker>> = new EventEmitter<
    YReadyEvent<YMapMarker>
  >();

  constructor(
    private readonly ngZone: NgZone,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly yMapComponent: YMapComponent,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.marker) {
        this.marker.update(changes['props'].currentValue);
      }
    });
  }

  ngAfterViewInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      // ContentChild cannot be used without a selector.
      // We do not have any selectors, and we do not want to force users to use them.
      // All we need is an alternative to React children, just to get everything projected to the component.
      // Using an element reference is probably the easiest solution for this.
      if (!this.element) {
        // It must be saved because the Yandex.Maps API deletes the element from the DOM.
        // Therefore, after a configuration change, we pass null, since it's deleted.
        this.element = this.elementRef.nativeElement.firstChild as HTMLElement;
      }

      this.marker = new ymaps3.YMapMarker(this.props, this.element);
      map.addChild(this.marker);
      this.ready.emit({ ymaps3, entity: this.marker });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
