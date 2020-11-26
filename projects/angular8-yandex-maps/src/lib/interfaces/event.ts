export type YaReadyEvent = Omit<YaEvent, 'event'>;

export interface YaEvent {
  /**
   * Instance of created entity
   */
  instance: any;
  /**
   * API global object
   */
  ymaps: typeof ymaps;
  /**
   * Provides methods for accessing the originalObject object's fields and methods, with the possibility for redefining them.
   * @see {@link https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Event.html/}
   */
  event: ymaps.Event;
}
