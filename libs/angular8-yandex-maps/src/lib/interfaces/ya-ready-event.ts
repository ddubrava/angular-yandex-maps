/**
 * Returns from a `(ready)` output.
 */
export interface YaReadyEvent<T = any> {
  /**
   * Instance of a target.
   */
  target: T;
  /**
   * API global object.
   */
  ymaps: typeof ymaps;
}
