# FAQ

## 1. Property `XXX` does not exist on type `typeof ymaps`

Some properties may not exist in the type definitions. Submit a bug please and use type casting:

```typescript
(ymaps as any).XXX;
```

## 2. How can I load API without using components?

Use [`YaApiLoaderService`](https://ddubrava.github.io/angular8-yandex-maps/injectables/YaApiLoaderService.html).

```typescript
import { YaApiLoaderService } from 'angular8-yandex-maps';

export class AppComponent {
  constructor(private yaApiLoaderService: YaApiLoaderService) {
    this.yaApiLoaderService.load().subscribe((api) => console.log(api));
  }
}
```

## 3. How can I get created object instance and global API object?

All components have `(ready)` event
implementing [`YaReadyEvent`](https://ddubrava.github.io/angular8-yandex-maps/interfaces/YaReadyEvent.html) interface.
Using `$event` you can access `ymaps` and also object instance. Moreover, `ready` event means object is created, so API
is loaded. You can access `ymaps` using `window.ymaps`

```html
<ya-map (ready)="onMapReady($event)"></ya-map>
```

```typescript
class MapComponent {
  onMapReady(event: YaReadyEvent) {
    // destructing ymaps same as window.ymaps, API is already loaded
    const { ymaps, instance } = event;
  }
}
```

## 4. I can't find a component for `XXX`

The library can't wrap all API classes. If you can't find any component, use `ymaps` object and follow Yandex.Maps API.
