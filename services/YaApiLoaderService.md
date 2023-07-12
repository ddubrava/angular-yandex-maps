# YaApiLoaderService


The `YaApiLoader` service handles loading of Yandex.Maps API.

```html
```ts
import { YaApiLoaderService } from 'angular8-yandex-maps';
```
@Component()
export class AppComponent {
  constructor(private yaApiLoaderService: YaApiLoaderService) {
    // Don't forget to unsubscribe
    this.yaApiLoaderService.load()
      .subscribe(v => console.log(v))
  }
}
```
