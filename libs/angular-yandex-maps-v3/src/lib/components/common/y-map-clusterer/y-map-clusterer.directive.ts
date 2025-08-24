import {
  AfterContentInit,
  ContentChild,
  Directive,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import type { LngLat } from '@yandex/ymaps3-types/common/types';
import {
  Feature,
  YMapClusterer,
  YMapClustererProps,
} from '@yandex/ymaps3-types/packages/clusterer';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Optional } from '../../../types/utilities/optional';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapClusterer](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/clusterer/#class-ymapclusterer) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 * This component is from the `@yandex/ymaps3-clusterer@0.0.1` package, which is asynchronously loaded when you use this component.
 *
 * The Yandex.Maps class is quite challenging, so I recommend checking the official documentation.
 * The component encapsulates some logic, making the class easier to use.
 * It remains fully customizable, and you can replicate the entire code from the official example.
 *
 * The Yandex.Maps class accepts `cluster` and `marker` callbacks that should return HTML for the elements.
 * You can achieve the same behavior using this component in two ways:
 *
 * 1. Pass cluster and marker to props and write completely custom logic. This is the same process that the library handles internally.
 * 2. Use `<ng-template #cluster let-context>` and `<ng-template #marker let-context>`, where the HTML from the templates is passed to `YMapMarker`.
 *
 * When using templates, you can access arguments from the callback through the `$implicit` variable.
 *
 * To define markers, you do not need to create the markers themselves; instead, you need to pass a `Feature[]`.
 * The official example creates an array of coordinates and maps it to the features array.
 *
 * The clustering method is `clusterByGrid({ gridSize: 64 })` by default, but you can override it and other options by passing them to `props`.
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
 *   <!-- Define your coordinates in the component and map them to Feature[] -->
 *   <y-map-clusterer
 *     [props]="{
 *       features: [
 *         {
 *           type: 'Feature',
 *           id: '0',
 *           geometry: {
 *             type: 'Point',
 *             coordinates: [-0.597696, 51.907351],
 *           },
 *         },
 *       ],
 *     }"
 *   >
 *     <ng-template #marker let-context>
 *       <!-- Your custom HTML for a point/marker -->
 *       <img src="./pin.svg" />
 *     </ng-template>
 *
 *     <ng-template #cluster let-context>
 *       <!-- Your custom HTML for a clusterer point/marker -->
 *       {{ context.features.length }}
 *     </ng-template>
 *   </y-map-clusterer>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-clusterer',
  standalone: true,
})
export class YMapClustererDirective implements AfterContentInit, OnDestroy, OnChanges {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject(YMapComponent);

  @ContentChild('marker') markerTemplate?: TemplateRef<{
    $implicit: Feature;
  }>;

  @ContentChild('cluster') clusterTemplate?: TemplateRef<{
    $implicit: {
      coordinates: LngLat;
      features: Feature[];
    };
  }>;

  private readonly destroy$ = new Subject<void>();

  private clusterer?: YMapClusterer;

  /**
   * Read the component description and see the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/clusterer/#YMapClustererProps}
   */
  @Input({ required: true }) props!: Optional<YMapClustererProps, 'marker' | 'cluster' | 'method'>;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapClusterer>> = new EventEmitter<
    YReadyEvent<YMapClusterer>
  >();

  ngAfterContentInit() {
    this.yMapComponent.map$
      .pipe(
        filter(Boolean),
        switchMap((map) =>
          // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
          from(ymaps3.import('@yandex/ymaps3-clusterer@0.0.1')).pipe(
            tap(({ YMapClusterer, clusterByGrid }) => {
              const marker = (feature: Feature) => {
                const element = this.getTemplateElement(this.markerTemplate, feature);

                return new ymaps3.YMapMarker(
                  {
                    coordinates: feature.geometry.coordinates,
                  },
                  element,
                );
              };

              const cluster = (coordinates: LngLat, features: Feature[]) => {
                const element = this.getTemplateElement(this.clusterTemplate, {
                  coordinates,
                  features,
                });

                return new ymaps3.YMapMarker(
                  {
                    coordinates,
                  },
                  element,
                );
              };

              this.clusterer = new YMapClusterer({
                marker,
                cluster,
                method: clusterByGrid({ gridSize: 64 }),
                ...this.props,
              });

              map.addChild(this.clusterer);
              this.ready.emit({ ymaps3, entity: this.clusterer });
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.clusterer) {
        this.clusterer.update(changes['props'].currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.clusterer) {
      this.yMapComponent.map$.value?.removeChild(this.clusterer);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTemplateElement(
    templateRef: TemplateRef<unknown> | undefined,
    context: unknown,
  ): HTMLElement {
    if (!templateRef) {
      throw new Error('TemplateRef cannot be undefined. It must be projected to the component.');
    }

    const view = templateRef.createEmbeddedView({ $implicit: context });

    view.detectChanges();

    // Get the first node, which is inside <ng-template />
    const element = view.rootNodes[0];

    if (!element) {
      throw new Error('TemplateRef cannot be empty. It must contain a node.');
    }

    return element;
  }
}
