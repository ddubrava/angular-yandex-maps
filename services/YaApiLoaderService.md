# YaApiLoaderService


The `YaApiLoader` service handles loading of Yandex.Maps API.

The service supports dynamic configuration changes by subscribing on a YaConfig observable.
It stores global API objects in a local cache, and updates them in runtime if necessary.
That's why do not provide this service, it will break the synchronizations between the local cache and HTML scripts.

```ts
import { YaApiLoaderService } from 'angular8-yandex-maps';

@Component()
export class AppComponent {
  constructor(private yaApiLoaderService: YaApiLoaderService) {
    // Don't forget to unsubscribe
    this.yaApiLoaderService.load()
      .subscribe(v => console.log(v))
  }
}
```
