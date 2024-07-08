# YApiLoaderService


The `YApiLoader` service handles loading of the Yandex.Maps API.
Use it if you do not need `YMapComponent`.

The service supports dynamic configuration changes by subscribing on a `YConfig` observable.
It stores global API objects in a local cache, and updates them in runtime if necessary.
That's why do not provide this service, it will break the synchronizations between the local cache and HTML scripts.

```ts
import { YApiLoaderService } from 'angular-yandex-maps-v3';

@Component()
export class AppComponent {
  constructor(private yApiLoaderService: YApiLoaderService) {
    // Don't forget to unsubscribe
    this.yApiLoaderService.load()
      .subscribe(v => console.log(v))
  }
}
```
