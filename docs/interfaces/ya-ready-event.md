# YaReadyEvent

```ts
export type YaReadyEvent<T = any> = Omit<YaEvent<T>, 'event'>;
```

## Example

```ts
public onReady(e: YaReadyEvent<ymaps.Map>): void {
  const { options } = e.target;
}
```

## Source

[lib/interfaces/event.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/interfaces/event.ts)
