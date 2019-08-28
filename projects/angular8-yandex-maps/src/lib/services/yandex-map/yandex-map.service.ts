import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { YandexMapModule } from '../../types/yandex-map.type';

declare const ymaps: any;

@Injectable({
  providedIn: 'root'
})
export class YandexMapService implements YandexMapModule.IYandexMapService {
  private _map$: Subject<YandexMapModule.IYandexMap> = new Subject();
  private _scriptYmaps: HTMLScriptElement;
  private _apiKey: string;

  constructor(private _injector: Injector) {
    this._apiKey = this._injector.get('API_KEY');
  }

  public initMap(
    mapId: string,
    state: YandexMapModule.IYandexMapState,
    options?: YandexMapModule.IYandexMapOptions
  ): Subject<YandexMapModule.IYandexMap> {
    this._loadScript();

    this._scriptYmaps.onload = () => {
      ymaps.ready(() => {
        this._createMap(mapId, state, options);
      });
    };

    return this._map$;
  }

  private _loadScript(): void {
    this._scriptYmaps = document.createElement('script');
    this._scriptYmaps.src = `https://api-maps.yandex.ru/2.1/?apikey=${this._apiKey}&lang=ru_RU`;
    document.body.appendChild(this._scriptYmaps);
  }

  private _createMap(
    mapId: string,
    state: YandexMapModule.IYandexMapState,
    options: YandexMapModule.IYandexMapOptions
  ): void {
    const map = new ymaps.Map(
      mapId,
      state,
      options
    );

    this._map$.next(map);
  }
}
