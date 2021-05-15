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
import { from, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { EventManager, YaEvent, YaReadyEvent } from '../../utils/event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * The `ya-panorama` component wraps `ymaps.panorama.Player` class from the Yandex Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * @example
 * <ya-map>
 *              <ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
 * </ya-map>
 */
@Directive({
  selector: 'ya-panorama',
})
export class YaPanoramaDirective implements OnInit, OnChanges, OnDestroy {
  private readonly _sub = new Subscription();

  private readonly _eventManager = new EventManager(this._ngZone);

  private _player?: ymaps.panorama.Player;

  /**
   * The point for searching for nearby panoramas.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-point}
   */
  @Input() point: number[];

  /**
   * The layer to search for panoramas.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-options.layer}
   */
  @Input() layer: ymaps.panorama.Layer;

  /**
   * Options for the player.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#panorama.Player__param-options}
   */
  @Input() options: ymaps.panorama.IPlayerOptions;

  /**
   * Panorama instance is created.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.panorama.Player>> = new EventEmitter<
    YaReadyEvent<ymaps.panorama.Player>
  >();

  /**
   * The player was closed by the user or destroyed using the panorama.Player.destroy method.
   */
  @Output() destroy: Observable<YaEvent<ymaps.panorama.Player>> = this._eventManager.getLazyEmitter(
    'destroy',
  );

  /**
   * The view direction changed.
   */
  @Output() directionchange: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('directionchange');

  /**
   * An error occurred during operation of the player. The user will be shown the appropriate screen.
   */
  @Output() yaerror: Observable<YaEvent<ymaps.panorama.Player>> = this._eventManager.getLazyEmitter(
    'error',
  );

  /**
   * The panorama player switched to full-screen mode.
   */
  @Output() fullscreenenter: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('fullscreenenter');

  /**
   * The panorama player exited full-screen mode.
   */
  @Output() fullscreenexit: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('fullscreenexit');

  /**
   * The user clicked on an expanded marker.
   */
  @Output() markercollapse: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('markercollapse');

  /**
   * The user clicked on a collapsed marker.
   */
  @Output() markerexpand: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('markerexpand');

  /**
   * The user's cursor hovered over a marker.
   */
  @Output() markermouseenter: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('markermouseenter');

  /**
   * The user's cursor left a marker.
   */
  @Output() markermouseleave: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('markermouseleave');

  /**
   * The open panorama changed.
   */
  @Output() panoramachange: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('panoramachange');

  /**
   * The size of the viewport has been changed.
   */
  @Output() spanchange: Observable<
    YaEvent<ymaps.panorama.Player>
  > = this._eventManager.getLazyEmitter('spanchange');

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const player = this._player;

    if (player) {
      const { point, layer, options } = changes;

      if (point) {
        player.moveTo(point.currentValue);
      }

      if (layer && point === undefined) {
        console.warn('The layer can not be changed without a point');
      }

      if (options) {
        console.warn(
          'The options can not be changed after entity init. You can set them manually using ymaps or recreate the Panorama with new options',
        );
      }
    }
  }

  ngOnInit(): void {
    if (this._yaMapComponent.isBrowser) {
      const panorama$ = this._yaMapComponent.map$.pipe(
        filter((m): m is ymaps.Map => Boolean(m)),
        switchMap((m: ymaps.Map) => {
          /**
           * Map and panorama use the same container, so need to destroy/remove map
           */
          m.destroy();
          return this._createPanorama();
        }),
      );

      const sub = panorama$.subscribe((panorama) => {
        const { id } = this._yaMapComponent.container.nativeElement;
        const player = new ymaps.panorama.Player(id, panorama, this.options);
        this._player = player;

        this._ngZone.run(() => this.ready.emit({ ymaps, target: player }));
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    this._eventManager.destroy();
    this._sub.unsubscribe();
  }

  /**
   * Searches for a panorama and returns first
   */
  private _createPanorama(): Observable<ymaps.IPanorama> {
    return from(ymaps.panorama.locate(this.point, { layer: this.layer })).pipe(
      map((panoramas) => panoramas[0]),
    );
  }
}
