# Frequently Asked Questions

## How does this library work?

The only thing it does is wrap the Yandex.Maps JavaScript API classes.
This means that in most cases, all the arguments you see in a class can be passed to a component.
So, components are just wrappers without any additional logic.

To get an instance of a class, you can use the `ready` output; each component has it.
This event also returns a global object (which you can also access from the window).
This means that you have access to the API, so you can implement anything the API allows.

If the library doesn't implement a class, you can create it on your own since you have the global object.
But, please, if you need something, feel free to create an issue.

The only tricky part is the `YApiLoaderService`.
Since the Yandex.Maps API doesn't support dynamic configuration (e.g., changing the language at runtime), we handle it ourselves.
The solution is complicated since we need to store scripts in a cache and change the global object on configuration changes.

## Components configuration

The Yandex.Maps components implement all the arguments for their respective classes from the Yandex.Maps JavaScript API through inputs.
For example, the [YMap](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymap) class accepts properties.

```html
<y-map
  [props]="{
    location: {
      center: [-0.127696, 51.507351],
      zoom: 10,
    },
    theme: 'dark',
  }"
>
  <y-map-default-scheme-layer />
</y-map>
```

## How can I access the created object instance and global API object?

The Yandex.Maps components implement the `ready` output, returning the [`YaReadyEvent`](v3/interfaces/YReadyEvent) interface.

```html
<y-map (ready)="onMapReady($event)"></y-map>
```

```typescript
export class AppComponent {
  onMapReady(event: YReadyEvent<YMap>): void {
    const { ymaps3, entity } = event;
  }
}
```

## How can I create a component that doesn't exist in the library?

You need to access the Yandex.Maps API global object and create what you need.

The API is loaded in `<y-map />` via `YApiLoaderService`. You can use a `ready` event from `y-map`, which will return the global object.
Or you can directly use the `YApiLoaderService` service.
