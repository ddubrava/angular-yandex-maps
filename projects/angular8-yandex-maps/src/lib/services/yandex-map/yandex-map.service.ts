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
  private _isScriptInited: boolean;

  constructor(private _injector: Injector) {
    this._apiKey = this._injector.get('API_KEY');
  }

  public initMap(): Subject<YandexMapModule.IYandexMap> {
    if (!this._isScriptInited) {
      this._isScriptInited = true;
      this._loadScript();
    }

    this._scriptYmaps.onload = () => {
      ymaps.ready(() => {
        this._map$.next();
      });
    };

    return this._map$;
  }

  private _loadScript(): void {
    this._scriptYmaps = document.createElement('script');
    this._scriptYmaps.src = `https://api-maps.yandex.ru/2.1/?apikey=${this._apiKey}&lang=ru_RU`;
    document.body.appendChild(this._scriptYmaps);
  }

  public createMap(
    mapId: string,
    state: YandexMapModule.IYandexMapState,
    options: YandexMapModule.IYandexMapOptions
  ): void {
    const map = new ymaps.Map(mapId, state, options);
    this._map$.next(map);
  }
}
