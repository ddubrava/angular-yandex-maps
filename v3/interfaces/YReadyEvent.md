# YReadyEvent


A component `(ready)` output event.


```ts
export interface YReadyEvent<T = any> {
  /**
   * Instance of a created entity.
   * For example, the result of calling `new ymaps3.YMap()`.
   */
  entity: T;
  /**
   * The API global object.
   * It's already in `window.ymaps3`, but you can also access it from this event.
   */
  ymaps3: typeof ymaps3;
}

```