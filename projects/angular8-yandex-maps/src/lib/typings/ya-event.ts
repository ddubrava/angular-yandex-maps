export interface YaEvent<T = any> {
  /**
   * Instance of target
   */
  target: T;
  /**
   * API global object
   */
  ymaps: typeof ymaps;
  /**
   * Provides methods for accessing the originalObject object's fields and methods, with the possibility for redefining them.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Event.html/}
   */
  event: ymaps.Event<any, T>;
}
