# YaEvent

```ts
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
   * @see {@link https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Event.html/}
   */
  event: ymaps.Event<any, T>;
}
```

## Example

```ts
public onClick(e: YaReadyEvent<ymaps.Map>): void {
  const { options } = e.target;
}
```

## Source

[lib/interfaces/event.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/interfaces/event.ts)
