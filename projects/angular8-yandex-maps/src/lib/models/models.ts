export interface IConfig {
  apiKey: string;
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
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
