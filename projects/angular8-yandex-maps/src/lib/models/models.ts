import { InjectionToken } from '@angular/core';

/**
 * Documentation for each property.
 * https://tech.yandex.ru/maps/jsapi/doc/2.1/dg/concepts/load-docpage/
 */
export interface IConfig {
  apikey: string;
  coordorder?: 'latlong' | 'longlat';
  /**
   * Use commercial version of the API
   */
  enterprise?: boolean;
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
  load?: string;
  mode?: 'release' | 'debug';
  /**
   * Version number of the API
   */
  version?: string;
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
