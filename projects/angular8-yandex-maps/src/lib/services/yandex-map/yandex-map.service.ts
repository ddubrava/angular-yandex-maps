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

  constructor(private _injector: Injector) {
    this._apiKey = this._injector.get('API_KEY');
  }

  /**
   * Init ymaps script if it's not initiated
   * Return ymaps subject
   */
  public initScript(): Subject<any> {
    if (!this._scriptYmaps) {
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
}
