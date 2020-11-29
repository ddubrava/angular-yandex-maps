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
import { generateRandomId } from '../../utils/generateRandomId';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { Listener } from '../../interfaces/listener';

/**
 * Directive for creating a geo object with the geometry geometry.Point.
 *
 * @example `<ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/placemark}
 */
@Directive({
  selector: 'ya-placemark',
})
export class YaPlacemarkDirective implements OnChanges, OnDestroy {
  /**
   * Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object.
   */
  @Input() public geometry: number[] | object | ymaps.IPointGeometry;

  /**
   * Properties for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-properties}
   */
  @Input() public properties: object | ymaps.IDataManager;

  /**
   * Options for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-options}
   */
  @Input() public options: ymaps.IPlacemarkOptions;

  /**
   * Placemark instance is created.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

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

  private _map: ymaps.Map;

  private _placemark: ymaps.Placemark;

  constructor(private _ngZone: NgZone) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this._updatePlacemark(changes);
  }

  /**
   * Method for dynamic Placemark configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updatePlacemark(changes: SimpleChanges): void {
    const placemark = this._placemark;

    if (!placemark) return;

    const { geometry, properties, options } = changes;

    if (geometry) {
      placemark.geometry?.setCoordinates(geometry.currentValue);
    }

    if (properties) {
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (placemark.properties as any).set(properties.currentValue);
    }

    if (options) {
      placemark.options.set(options.currentValue);
    }
  }

  private _checkRequiredInputs(): void {
    if (this.geometry === undefined || this.geometry === null) {
      throw new Error('Geometry is required');
    }
  }

  /**
   * Creates placemark.
   *
   * @param map Necessary for removing entity from map.geoObjects on Placemark destroy
   * `this.map.geoObjects.remove(this.placemark);`.
   * @param clusterer Necessary for removing entity from Clusterer on Placemark destroy
   * `this.clusterer.remove(this.placemark);`.
   */
  public createPlacemark(
    map: ymaps.Map,
    clusterer?: ymaps.Clusterer,
  ): ymaps.Placemark {
    this._checkRequiredInputs();

    const placemark = new ymaps.Placemark(
      this.geometry,
      this.properties,
      this.options,
    );

    this._ngZone.run(() => this.ready.emit({ ymaps, target: placemark }));

    this.id = generateRandomId();

    this._clusterer = clusterer;
    this._map = map;
    this._placemark = placemark;

    this._addEventListeners();

    return placemark;
  }

  /**
   * Adds listeners on the Placemark events.
   */
  private _addEventListeners(): void {
    const placemark = this._placemark;

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
      target: placemark,
      ymaps,
    });

    listeners.forEach((listener) => {
      placemark.events.add(listener.name, (e: ymaps.Event) =>
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
    (this._clusterer as any)?.remove(this._placemark);
    this._map?.geoObjects.remove(this._placemark);
  }
}
