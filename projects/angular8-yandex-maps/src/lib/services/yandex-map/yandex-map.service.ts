import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { YandexMapModule } from '../../types/yandex-map.type';
import { IYandexMapService } from '../../types/yandex-service.type';

declare const ymaps: any;

@Injectable({
  providedIn: 'root'
})
export class YandexMapService implements IYandexMapService {
  private _isMapInited$: Subject<boolean> = new Subject();
  private _scriptYmaps: HTMLScriptElement;
  private _apiKey: string;
  private _isScriptInited: boolean;
  private _map: YandexMapModule.IYandexMap;

  constructor(private _injector: Injector) {
    this._apiKey = this._injector.get('API_KEY');
  }

  public initMap(): Subject<boolean> {
    if (!this._isScriptInited) {
      this._isScriptInited = true;
      this._loadScript();
    }

    this._scriptYmaps.onload = () => {
      ymaps.ready(() => {
        this._isMapInited$.next(true);
      });
    };

    return this._isMapInited$;
  }

  private _loadScript(): void {
    this._scriptYmaps = document.createElement('script');
    this._scriptYmaps.src = `https://api-maps.yandex.ru/2.1/?apikey=${this._apiKey}&lang=ru_RU`;
    document.body.appendChild(this._scriptYmaps);
  }

  public createMap(mapId: string, state: YandexMapModule.IYandexMapState, options: YandexMapModule.IYandexMapOptions): void {
    this._map = new ymaps.Map(mapId, state, options);
  }

  public createPlacemark(geometry: any, properties: any = {}, options: YandexMapModule.IPlacemarkOptions = {}): void {
    this._map.geoObjects
      .add(new ymaps.Placemark(geometry, properties, options));
  }

  public createMultiroute(model: any, options: any): void {
    this._map.geoObjects
      .add(new ymaps.multiRouter.MultiRoute(model, options));
  }

  public createGeoObject(feature: any, options: any): void {
    this._map.geoObjects
      .add(new ymaps.GeoObject(feature, options));
  }
}
