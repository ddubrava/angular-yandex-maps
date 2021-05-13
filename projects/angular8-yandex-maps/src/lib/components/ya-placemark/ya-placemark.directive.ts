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
import { Subscription } from 'rxjs';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { EventManager, YaReadyEvent } from '../../utils/event-manager';

/**
 * Directive that renders a geo object with the geometry geometry.Point.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/placemark}
 */
@Directive({
  selector: 'ya-placemark',
})
export class YaPlacemarkDirective implements OnInit, OnChanges, OnDestroy {
  private readonly _sub = new Subscription();

  private readonly _eventManager = new EventManager(this._ngZone);

  placemark?: ymaps.Placemark;

  /**
   * Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object.
   */
  @Input() geometry: number[] | object | ymaps.IPointGeometry;

  /**
   * Properties for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-properties}
   */
  @Input() properties: object | ymaps.IDataManager;

  /**
   * Options for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-options}
   */
  @Input() options: ymaps.IPlacemarkOptions;

  /**
   * Placemark instance is added in a Map.
   */
  @Output() ready = new EventEmitter<YaReadyEvent<ymaps.Placemark>>();

  /**
   * Closing the balloon.
   */
  @Output() balloonclose = this._eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a map.
   */
  @Output() balloonopen = this._eventManager.getLazyEmitter('balloonopen');

  /**
   * Event preceding the "drag" event.
   */
  @Output() beforedrag = this._eventManager.getLazyEmitter('beforedrag');

  /**
   * Event preceding the "dragstart" event.
   */
  @Output() beforedragstart = this._eventManager.getLazyEmitter('beforedragstart');

  /**
   * Single left-click on the object.
   */
  @Output() yaclick = this._eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() yacontextmenu = this._eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   */
  @Output() yadbclick = this._eventManager.getLazyEmitter('dbclick');

  /**
   * Dragging a geo object.
   */
  @Output() yadrag = this._eventManager.getLazyEmitter('drag');

  /**
   * End of geo object dragging.
   */
  @Output() yadragend = this._eventManager.getLazyEmitter('dragend');

  /**
   * Start of geo object dragging.
   */
  @Output() yadragstart = this._eventManager.getLazyEmitter('dragstart');

  /**
   * Change in the state of the editor for the geo object's geometry.
   */
  @Output() editorstatechange = this._eventManager.getLazyEmitter('editorstatechange');

  /**
   * Change to the geo object geometry
   */
  @Output() geometrychange = this._eventManager.getLazyEmitter('geometrychange');

  /**
   * Closing the hint.
   */
  @Output() hintclose = this._eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   */
  @Output() hintopen = this._eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   */
  @Output() mapchange = this._eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   */
  @Output() yamousedown = this._eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() yamouseenter = this._eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   */
  @Output() yamouseleave = this._eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   */
  @Output() yamousemove = this._eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() yamouseup = this._eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() multitouchend = this._eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   */
  @Output() multitouchmove = this._eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   */
  @Output() multitouchstart = this._eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   */
  @Output() optionschange = this._eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   */
  @Output() overlaychange = this._eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange = this._eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   */
  @Output() propertieschange = this._eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   */
  @Output() yawheel = this._eventManager.getLazyEmitter('wheel');

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { placemark } = this;

    if (placemark) {
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
  }

  ngOnInit(): void {
    if (this._yaMapComponent.isBrowser) {
      const sub = this._yaMapComponent.map$.subscribe((map) => {
        if (map) {
          const placemark = this._createPlacemark();
          this.placemark = placemark;

          map.geoObjects.add(placemark);
          this._eventManager.setTarget(placemark);
          this.ready.emit({ ymaps, target: placemark });
        }
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    if (this.placemark) {
      this._yaMapComponent?.map$.value?.geoObjects.remove(this.placemark);
      this._eventManager.destroy();
    }

    this._sub.unsubscribe();
  }

  /**
   * Creates placemark.
   */
  private _createPlacemark(): ymaps.Placemark {
    return new ymaps.Placemark(this.geometry, this.properties, this.options);
  }
}
