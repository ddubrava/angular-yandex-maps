import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { from, Observable, Subject, takeUntil } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { YaEvent } from '../../interfaces/ya-event';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { EventManager } from '../../utils/event-manager/event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * The `ya-panorama` component wraps `ymaps.panorama.Player` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * ```html
 * <ya-map>
 *   <ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-panorama',
})
export class YaPanoramaDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  private player?: ymaps.panorama.Player;

  /**
   * The point for searching for nearby panoramas.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-point}
   */
  @Input() point: number[] = [];

  /**
   * The layer to search for panoramas.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-options.layer}
   */
  @Input() layer?: ymaps.panorama.Layer;

  /**
   * Player options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#panorama.Player__param-options}
   */
  @Input() options?: ymaps.panorama.IPlayerOptions;

  /**
   * Panorama instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.panorama.Player>> = new EventEmitter<
    YaReadyEvent<ymaps.panorama.Player>
  >();

  /**
   * The player was closed by the user or destroyed using the panorama.Player.destroy method.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-destroy}
   */
  @Output() destroy: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('destroy');

  /**
   * The view direction changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-directionchange}
   */
  @Output() directionchange: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('directionchange');

  /**
   * An error occurred during operation of the player. The user will be shown the appropriate screen.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-error}
   */
  @Output() yaerror: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('error');

  /**
   * The panorama player switched to full-screen mode.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-fullscreenenter}
   */
  @Output() fullscreenenter: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('fullscreenenter');

  /**
   * The panorama player exited full-screen mode.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-fullscreenexit}
   */
  @Output() fullscreenexit: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('fullscreenexit');

  /**
   * The user clicked on an expanded marker.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markercollapse}
   */
  @Output() markercollapse: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('markercollapse');

  /**
   * The user clicked on a collapsed marker.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markerexpand}
   */
  @Output() markerexpand: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('markerexpand');

  /**
   * The user's cursor hovered over a marker.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markermouseenter}
   */
  @Output() markermouseenter: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('markermouseenter');

  /**
   * The user's cursor left a marker.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markermouseleave}
   */
  @Output() markermouseleave: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('markermouseleave');

  /**
   * The open panorama changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-panoramachange}
   */
  @Output() panoramachange: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('panoramachange');

  /**
   * The size of the viewport has been changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-spanchange}
   */
  @Output() spanchange: Observable<YaEvent<ymaps.panorama.Player>> =
    this.eventManager.getLazyEmitter('spanchange');

  constructor(
    private readonly ngZone: NgZone,
    private readonly yaMapComponent: YaMapComponent,
  ) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { player } = this;

    if (player) {
      const { point, layer, options } = changes;

      /**
       * player.moveTo resets values to default if any of them isn't passed.
       * That's why we use value from currentValue OR previous value from input.
       * With that logic it's possible to pass only point, layer or options.
       */
      if (point || layer) {
        const combinedPoint: number[] = point?.currentValue || this.point;
        const combinedLayer: ymaps.panorama.Layer = layer?.currentValue || this.layer;

        player.moveTo(combinedPoint, { layer: combinedLayer });
      }

      if (options) {
        this.setOptions(options.currentValue, player);
      }
    }
  }

  ngOnInit(): void {
    const panorama$ = this.yaMapComponent.map$.pipe(
      filter(Boolean),
      switchMap((map: ymaps.Map) => {
        /**
         * Maps and panoramas use the same container,
         * so we need to destroy/remove this map.
         */
        map.destroy();

        return this.createPanorama();
      }),
    );

    panorama$.pipe(takeUntil(this.destroy$)).subscribe((panorama) => {
      const { id } = this.yaMapComponent.container.nativeElement;
      const player = new ymaps.panorama.Player(id, panorama, this.options);

      /**
       * If the panorama$ is changed, it means that the $map is changed,
       * and finally it means that the configuration is changed, e.g. language,
       * and we need to reinitialize the player.
       */
      if (this.player) {
        this.player.destroy();
      }

      this.player = player;

      /**
       * The API breaks if we call destroy on a destroyed player instance.
       * That's why sync states => local and API.
       */
      this.player.events.add('destroy', () => {
        this.player = undefined;
      });

      this.eventManager.setTarget(player);
      this.ready.emit({ ymaps, target: player });
    });
  }

  ngOnDestroy(): void {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Destructs state and passes it in API.
   * @param options
   * @param player
   */
  private setOptions(options: ymaps.panorama.IPlayerOptions, player: ymaps.panorama.Player): void {
    const {
      autoFitToViewport,
      controls,
      direction,
      hotkeysEnabled,
      span,
      scrollZoomBehavior,
      suppressMapOpenBlock,
    } = options;

    if (
      autoFitToViewport ||
      controls ||
      hotkeysEnabled ||
      scrollZoomBehavior ||
      suppressMapOpenBlock
    ) {
      console.warn(
        'Only direction and span can be set after entity init. To set other options, you should recreate a Panorama with new options',
      );
    }

    if (direction) {
      player.setDirection(direction);
    }

    if (span) {
      player.setSpan(span);
    }
  }

  /**
   * Searches for a panorama and returns first
   */
  private createPanorama(): Observable<ymaps.IPanorama> {
    return from(ymaps.panorama.locate(this.point, { layer: this.layer })).pipe(
      map((panoramas) => panoramas[0]),
    );
  }
}
