/**
 * @internal
 */
export interface YaApiLoaderCache {
  /**
   * API global object.
   */
  ymaps?: typeof ymaps;

  /**
   * Script element that loads API.
   */
  script?: HTMLScriptElement;
}
