import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Listener } from '../../interfaces/listener';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { generateRandomId } from '../../utils/generateRandomId';

/**
 * Directive for creating a geo object.
 * Can be displayed as a placemark, polyline, polygon, etc., depending on the geometry type.
 *
 * @example `<ya-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"></ya-geoobject>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/geoobject}
 */
@Directive({
  selector: 'ya-geoobject',
})
export class YaGeoobjectDirective implements OnChanges, OnDestroy {
  /**
   * Feature for the GeoObject.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObjectparam-feature}
   */
  @Input() public feature: any;

  /**
   * Options for the GeoObject.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObjectparam-options}
   */
  @Input() public options: ymaps.IGeoObjectOptions;

  /**
   * GeoObject instance is added in a Map.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent<ymaps.GeoObject>>();

  /**
   * Closing the balloon.
   */
  @Output() public balloonclose = new EventEmitter<YaEvent>();

  /**
   * Opening a balloon on a map.
   */
  @Output() public balloonopen = new EventEmitter<YaEvent>();

  /**
   * Event preceding the "drag" event.
   */
  @Output() public beforedrag = new EventEmitter<YaEvent>();

  /**
   * Event preceding the "dragstart" event.
   */
  @Output() public beforedragstart = new EventEmitter<YaEvent>();

  /**
   * Single left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<YaEvent>();

  /**
   * Calls the element's context menu.
   */
  @Output() public yacontextmenu = new EventEmitter<YaEvent>();

  /**
   * Double left-click on the object.
   */
  @Output() public yadbclick = new EventEmitter<YaEvent>();

  /**
   * Dragging a geo object.
   */
  @Output() public yadrag = new EventEmitter<YaEvent>();

  /**
   * End of geo object dragging.
   */
  @Output() public yadragend = new EventEmitter<YaEvent>();

  /**
   * Start of geo object dragging.
   */
  @Output() public yadragstart = new EventEmitter<YaEvent>();

  /**
   * Change in the state of the editor for the geo object's geometry.
   */
  @Output() public editorstatechange = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object geometry
   */
  @Output() public geometrychange = new EventEmitter<YaEvent>();

  /**
   * Closing the hint.
   */
  @Output() public hintclose = new EventEmitter<YaEvent>();

  /**
   * Opening a hint on a map.
   */
  @Output() public hintopen = new EventEmitter<YaEvent>();

  /**
   * Map reference changed.
   */
  @Output() public mapchange = new EventEmitter<YaEvent>();

  /**
   * Pressing the mouse button over the object.
   */
  @Output() public yamousedown = new EventEmitter<YaEvent>();

  /**
   * Pointing the cursor at the object.
   */
  @Output() public yamouseenter = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor off of the object.
   */
  @Output() public yamouseleave = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor over the object.
   */
  @Output() public yamousemove = new EventEmitter<YaEvent>();

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() public yamouseup = new EventEmitter<YaEvent>();

  /**
   * End of multitouch.
   */
  @Output() public multitouchend = new EventEmitter<YaEvent>();

  /**
   * Repeating event during multitouch.
   */
  @Output() public multitouchmove = new EventEmitter<YaEvent>();

  /**
   * Start of multitouch.
   */
  @Output() public multitouchstart = new EventEmitter<YaEvent>();

  /**
   * Change to the object options.
   */
  @Output() public optionschange = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object overlay.
   */
  @Output() public overlaychange = new EventEmitter<YaEvent>();

  /**
   * The parent object reference changed.
   */
  @Output() public parentchange = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object data.
   */
  @Output() public propertieschange = new EventEmitter<YaEvent>();

  /**
   * Mouse wheel scrolling.
   */
  @Output() public yawheel = new EventEmitter<YaEvent>();

  public id: string;

  // Yandex.Maps API.
  private _clusterer: ymaps.Clusterer | undefined;

  private _geoObject: ymaps.GeoObject;

  private _map: ymaps.Map;

  constructor(private _ngZone: NgZone) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateGeoObject(changes);
  }

  /**
   * Method for dynamic GeoObject configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updateGeoObject(changes: SimpleChanges): void {
    const geoObject = this._geoObject;

    if (!geoObject) return;

    const { feature, options } = changes;

    if (feature) {
      this._setFeature(feature.currentValue, geoObject);
    }

    if (options) {
      geoObject.options.set(options.currentValue);
    }
  }

  /**
   * Destructs state and provides new values to API.
   * @param feature
   * @param geoObject
   */
  private _setFeature(
    feature: ymaps.IGeoObjectFeature,
    geoObject: ymaps.GeoObject,
  ): void {
    const { geometry, properties } = feature;

    if (geometry) {
      throw new Error(
        "The geometry can't be changed after entity init. You can set them manually using ymaps or recreate the GeoObject new feature.geometry",
      );
    }

    if (properties) {
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (geoObject.properties as any).set(properties);
    }
  }

  /**
   * Creates GeoObject.
   *
   * @param map Necessary for removing entity from map.geoObjects on GeoObject destroy
   * `this.map.geoObjects.remove(this.geoObject);`.
   * @param clusterer Necessary for removing entity from Clusterer on GeoObject destroy
   * `this.clusterer.remove(this.geoObject);`.
   */
  public createGeoObject(
    map: ymaps.Map,
    clusterer?: ymaps.Clusterer,
  ): ymaps.GeoObject {
    this._checkRequiredInputs();

    const geoObject = new ymaps.GeoObject(this.feature, this.options);
    this.id = generateRandomId();

    this._clusterer = clusterer;
    this._geoObject = geoObject;
    this._map = map;

    this._addEventListeners();

    return geoObject;
  }

  private _checkRequiredInputs(): void {
    if (this.feature === undefined || this.feature === null) {
      throw new Error('Feature is required');
    }
  }

  /**
   * Adds listeners on the GeoObject events.
   */
  private _addEventListeners(): void {
    const geoObject = this._geoObject;

    const listeners: Listener[] = [
      { name: 'balloonclose', emitter: this.balloonclose },
      { name: 'balloonopen', emitter: this.balloonopen },
      { name: 'beforedrag', emitter: this.beforedrag },
      { name: 'beforedragstart', emitter: this.beforedragstart },
      { name: 'click', emitter: this.yaclick },
      { name: 'contextmenu', emitter: this.yacontextmenu },
      { name: 'dbclick', emitter: this.yadbclick },
      { name: 'drag', emitter: this.yadrag },
      { name: 'dragend', emitter: this.yadragend },
      { name: 'dragstart', emitter: this.yadragstart },
      { name: 'editorstatechange', emitter: this.editorstatechange },
      { name: 'geometrychange', emitter: this.geometrychange },
      { name: 'hintclose', emitter: this.hintclose },
      { name: 'hintopen', emitter: this.hintopen },
      { name: 'mapchange', emitter: this.mapchange },
      { name: 'mousedown', emitter: this.yamousedown },
      {
        name: 'mouseenter',
        emitter: this.yamouseenter,
        runOutsideAngular: true,
      },
      {
        name: 'mouseleave',
        emitter: this.yamouseleave,
        runOutsideAngular: true,
      },
      { name: 'mousemove', emitter: this.yamousemove, runOutsideAngular: true },
      { name: 'mouseup', emitter: this.yamouseup, runOutsideAngular: true },
      {
        name: 'multitouchend',
        emitter: this.multitouchend,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchmove',
        emitter: this.multitouchmove,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchstart',
        emitter: this.multitouchstart,
        runOutsideAngular: true,
      },
      { name: 'optionschange', emitter: this.optionschange },
      { name: 'overlaychange', emitter: this.overlaychange },
      { name: 'parentchange', emitter: this.parentchange },
      { name: 'propertieschange', emitter: this.propertieschange },
      { name: 'wheel', emitter: this.yawheel },
    ];

    const fn = (event: ymaps.Event): YaEvent => ({
      event,
      target: geoObject,
      ymaps,
    });

    listeners.forEach((listener) => {
      geoObject.events.add(listener.name, (e: ymaps.Event) =>
        listener.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => listener.emitter.emit(fn(e)))
          : this._ngZone.run(() => listener.emitter.emit(fn(e))),
      );
    });
  }

  public ngOnDestroy(): void {
    /**
     * Wrong typings in DefinitelyTyped.
     */
    (this._clusterer as any)?.remove(this._geoObject);
    this._map?.geoObjects.remove(this._geoObject);
  }
}
