# YaGeocoderService


The `YaGeocoder` service wraps `ymaps.geocode` static function from the Yandex.Maps API.

```html
```ts
import { YaGeocoderService } from 'angular8-yandex-maps';
```
@Component()
export class AppComponent {
  constructor(private yaGeocoderService: YaGeocoderService) {
    // Don't forget to unsubscribe
    this.yaGeocoderService.geocode('Moscow')
      .subscribe(v => console.log(v))
  }
}
```
