/**
 * Event that is returned from a `(ready)` output.
 */
export interface YaReadyEvent<T = any> {
  /**
   * Instance of target.
   */
  target: T;
  /**
   * API global object.
   */
  ymaps: typeof ymaps;
}
