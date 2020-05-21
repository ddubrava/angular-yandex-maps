import { Inject, Injectable, Optional } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { IYandexMapService } from './yandex-service.type';
import { DOCUMENT } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { IConfig } from '../../models/models';

declare const ymaps: any;

/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class YandexMapService implements IYandexMapService {
  private _scriptYmaps: HTMLScriptElement;
  private _config: Partial<IConfig>;

  constructor(
    @Optional() @Inject('CONFIG') config: Partial<IConfig>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._config = config ? config : {};
  }

  /**
   * Init ymaps script if it's not initiated
   * Return ymaps observable
   */
  public initScript(): Observable<any> {
    if (!this._scriptYmaps) {
      const ymapScript = this.document.createElement('script');
      const { apiKey = null, lang = 'ru_RU' }: Partial<IConfig> = this._config;

      ymapScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${lang}`;
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
