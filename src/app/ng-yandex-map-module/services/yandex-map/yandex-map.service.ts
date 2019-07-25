import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const ymaps: any;

@Injectable({
  providedIn: 'root'
})
export class YandexMapService {
  private _map$: Subject<any> = new Subject();
  private _scriptYmaps: HTMLScriptElement;

  constructor() {}

  private _loadScript(): void {
    this._scriptYmaps = document.createElement('script');
    this._scriptYmaps.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    document.body.appendChild(this._scriptYmaps);
  }

  private _createMap(element: string, options: any): void {
    const map = new ymaps.Map(
      element,
      options
    );

    this._map$.next(map);
  }

  public initMap(element: string, options: any): Subject<any> {
    this._loadScript();

    this._scriptYmaps.onload = () => {
      ymaps.ready(() => {
        this._createMap(element, options);
      });
    };

    return this._map$;
  }
}
