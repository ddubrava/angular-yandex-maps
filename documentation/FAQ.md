# Frequently asked questions

## Components configuration

The Yandex.Maps components implement all the arguments for their respective classes from the Yandex.Maps JavaScript API
through inputs, but they also have specific inputs for some of the most common options. For example,
the [Map class](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html) has state and options.

```html
<ya-map [state]="state" [options]="options"></ya-map>
```

```typescript
state: ymaps.IMapState = {
  center: [55.751952, 37.600739],
  zoom: 3,
};

options: ymaps.IMapOptions = {
  maxZoom: 5,
};
```

It can also have individual options set for some of the most common options.

```html
<ya-map [center]="[55.751952, 37.600739]" [zoom]="5"></ya-map>
```

Not every option has its own input. See the API for each component to see if the option has a dedicated input or if it
should be set in the options input.

## Components events

The Yandex.Maps components implement all the events for their respective classes from the Yandex.Maps JavaScript API
through outputs. For example, to add the listener on the `balloonclose` event
from [Map class](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#Map__events-summary).

```html
<ya-map (balloonclose)="onBalloonClose($event)"></ya-map>
```

## How can I access to the created object instance and global API object?

The Yandex.Maps components implement `ready` output
returning [`YaReadyEvent`](https://ddubrava.github.io/angular8-yandex-maps/interfaces/YaReadyEvent.html) interface.

```html
<ya-map (ready)="onMapReady($event)"></ya-map>
```

```typescript
class MapComponent {
  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const { ymaps, target } = event;
  }
}
```

## How can I create a component that doesn't exist in the library?

You should use the global API object, there are two ways to get it:

1. [Use components outputs (recommended)](#how-can-i-access-to-the-created-object-instance-and-global-api-object)
2. [Use YaApiLoaderService](#is-it-possible-to-load-the-api-without-using-components)

## Property `XXX` does not exist on type `typeof ymaps`.

Our Yandex.Maps typings are not ideal, there are a lot of missing fields. Unfortunately, at the same time a lot of
fields are not documented in the Yandex.Maps API. If you find any problems, submit a bug please and use type casting.

```typescript
const instance = new (ymaps as any).UnexistingClass();
```

## Is it possible to load the API without using components?

Use [`YaApiLoaderService`](https://ddubrava.github.io/angular8-yandex-maps/injectables/YaApiLoaderService.html).

```typescript
import { YaApiLoaderService } from 'angular8-yandex-maps';

export class AppComponent {
  constructor(private yaApiLoaderService: YaApiLoaderService) {
    this.yaApiLoaderService.load().subscribe((v) => console.log(v));
  }
}
```

## How can I use the geocoder?

Use [`YaGeocoderService`](http://localhost:63342/.gitignore/dist/docs/injectables/YaGeocoderService.html).

```typescript
import { YaGeocoderService } from 'angular8-yandex-maps';

export class AppComponent {
  constructor(private yaGeocoderService: YaGeocoderService) {
    this.yaGeocoderService.geocode('Moscow').subscribe((v) => console.log(v));
  }
}
```
