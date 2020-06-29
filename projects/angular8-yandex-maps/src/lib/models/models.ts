/**
 * Documentation for each property.
 * https://tech.yandex.ru/maps/jsapi/doc/2.1/dg/concepts/load-docpage/
 */
import { InjectionToken } from "@angular/core";

export interface IConfig {
  apikey: string;
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
  coordorder?: 'latlong' | 'longlat';
  load?: string;
  mode?: 'release' | 'debug';
}

export interface ILoadEvent {
  instance?: any;
  ymaps: any;
}

export interface IEvent {
  instance: any;
  ymaps: any;
  type: string | undefined;
  event: any;
}

export const YA_MAP_CONFIG = new InjectionToken<Partial<IConfig>>('YA_MAP_CONFIG');
