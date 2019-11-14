import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { IYandexMapService } from './yandex-service.type';

declare const ymaps: any;

@Injectable({
  providedIn: 'root'
})
export class YandexMapService implements IYandexMapService {
  private _ymaps$ = new Subject<any>();
  private _scriptYmaps: HTMLScriptElement;
  private _apiKey: string;
  private _isScriptInited: boolean;
  private _map: any;

  constructor(private _injector: Injector) {
    this._apiKey = this._injector.get('API_KEY');
  }

  /**
   * Init ymaps script if it's not initiated
   * Return ymaps subject
   */
  public initScript(): Subject<any> {
    if (!this._isScriptInited) {
      this._isScriptInited = true;
      this._loadScript();

      this._scriptYmaps.onload = () => {
        ymaps.ready(() => this._ymaps$.next(ymaps));
      };
    }

    return this._ymaps$;
  }

  private _loadScript(): void {
    this._scriptYmaps = document.createElement('script');
    this._scriptYmaps.src = `https://api-maps.yandex.ru/2.1/?apikey=${this._apiKey}&lang=ru_RU`;
    document.body.appendChild(this._scriptYmaps);
  }

  /**
   * Create new Map class instance
   * @param mapId
   * @param state
   * @param options
   */
  public createMap(mapId: string, state: any, options: any): void {
    this._map = new ymaps.Map(mapId, state, options);
  }

  /**
   * Add objects, controls on map
   */
  public addPlacemark(geometry: any, properties: any, options: any): void {
    this._map.geoObjects
      .add(new ymaps.Placemark(geometry, properties, options));
  }

  public addMultiroute(model: any, options: any): void {
    this._map.geoObjects
      .add(new ymaps.multiRouter.MultiRoute(model, options));
  }

  public addGeoObject(feature: any, options: any): void {
    this._map.geoObjects
      .add(new ymaps.GeoObject(feature, options));
  }

  /**
   * Create new SearchControl class instance with properies
   * If searchRequest is provided -> force search in the current area
   * @param request
   * @param properties
   */
  public addSearchControl(request: string, properties: any): void {
    const searchControl = new ymaps.control.SearchControl(properties);

    this._map.controls
      .add(searchControl);

    if (request) searchControl.search(request);
  }
}
