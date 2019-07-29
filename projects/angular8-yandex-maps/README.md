# Angular8-yandex-maps

[Example](https://github.com/ddubrava/angular-yandex-maps/tree/develop/src/app)

## Установка


```bash
npm install angular8-yandex-maps
```

## Использование
### module.ts
```
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [
    AngularYandexMapsModule.forRoot(API_KEY or null)
  ]
})
```

### component.html
```
<angular-yandex-map
  class="yandex-map__map"
  [mapState]="mapState"
  [mapOptions]="mapOptions"
></angular-yandex-map>
```

### component.scss
```
.yandex-map {
  &__map {
    width: 1000px;
    height: 500px;
  }
}
```

### component.ts
```
  import { YandexMapModule } from 'angular8-yandex-maps';

  public mapState: YandexMapModule.IYandexMapState = {
    center: [60.169931, 24.938513],
    zoom: 13
  };

  public mapOptions: YandexMapModule.IYandexMapOptions = {
    maxZoom: 15
  };
```

## Версия 0.1.1
- Реализована поддержка карты
- Реализована поддержка Map.state, Map.options ([Документация](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/))

## License
[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)