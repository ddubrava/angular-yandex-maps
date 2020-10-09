import { InjectionToken } from '@angular/core';

/**
 * API loading parameters
 * @see {@link https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html/#load__param} for further information
 */
export interface IConfig {
  /**
   * API key. You can get a key in the developer's dashboard
   */
  apikey: string;
  /**
   * Locales
   */
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
  /**
   * The order for setting geographical coordinates in API functions that accept longitude-latitude input
   */
  coordorder?: 'latlong' | 'longlat';
  /**
   * List of modules to load
   */
  load?: string;
  /**
   * API loading mode
   */
  mode?: 'release' | 'debug';
  /**
   * Use commercial version of the API
   */
  enterprise?: boolean;
  /**
   * Version number of the API
   */
  version?: string;
}

export interface ILoadEvent {
  /**
   * Instance of created entity
   */
  instance?: any;
  /**
   * API global object
   */
  ymaps: any;
}

export interface IEvent {
  /**
   * Instance of created entity
   */
  instance: any;
  /**
   * API global object
   */
  ymaps: any;
  /**
   * String event type, event.originalEvent.type
   */
  type: string | undefined;
  /**
   * Event that is fired by the IEventManager event manager
   */
  event: any;
}

export const YA_MAP_CONFIG = new InjectionToken<Partial<IConfig>>('YA_MAP_CONFIG');
