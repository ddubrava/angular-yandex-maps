import { Inject, Injectable, Optional } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { IYandexMapService } from './yandex-service.type';
import { DOCUMENT } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

declare const ymaps: any;

/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class YandexMapService implements IYandexMapService {
  private _scriptYmaps: HTMLScriptElement;
  private _apiKey: string;

  constructor(
    @Optional() @Inject('API_KEY') apiKey: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._apiKey = apiKey;
  }

  /**
   * Init ymaps script if it's not initiated
   * Return ymaps subject
   */
  public initScript(): Observable<any> {
    if (!this._scriptYmaps) {
      const ymapScript = this.document.createElement('script');
      ymapScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${this._apiKey}&lang=ru_RU`;
      this._scriptYmaps = this.document.body.appendChild(ymapScript);
    }

    if ('ymaps' in window) {
      return from(ymaps.ready()).pipe(map(() => ymaps));
    }

    return fromEvent(this._scriptYmaps, 'load').pipe(
      switchMap(() => from(ymaps.ready()).pipe(map(() => ymaps)))
    );
  }
}
