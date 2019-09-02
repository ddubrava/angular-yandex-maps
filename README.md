
# Angular8-yandex-maps

[Example](https://github.com/ddubrava/angular-yandex-maps/tree/develop/src/app)
[Repository](https://github.com/ddubrava/angular-yandex-maps)

## Installation

```
npm install angular8-yandex-maps
```

## Usage
### module.ts

```
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(API_KEY or null)]
})
```

### component.html

```
<div class="map">
  <angular-yandex-map [center]="[60.167987, 24.942206]" [zoom]="12">
    <angular-yandex-placemark [geometry]="[60.167987, 24.942206]"></angular-yandex-placemark>
  </angular-yandex-map>
</div>
```

### component.css

```
.map {
  width: 1000px;
  height: 500px;
}
```

## Map
Available inputs:

Required:
 - center: Number[]
 - zoom: Number

Optional:
 - mapState: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-state)
 - mapOptions: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-options)

```
<angular-yandex-map [center]="[60.167987, 24.942206]" [zoom]="8" [mapState]="{type: 'yandex#satellite'}"></angular-yandex-map>
```

## Placemark
Available inputs:

Required:
 - geometry:  Number[] | Object | [IPointGeometry](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IPointGeometry-docpage/ "IPointGeometry")

Optional:
- placemarkProperties: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties "Interface")
- placemarkOptions: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options "Interface")
```
<angular-yandex-placemark [geometry]="[60.167987, 24.942206]" [placemarkProperties]="{iconCaption: 'Stockmann'}"></angular-yandex-placemark>
```

## Types
You can import YandexMapModule types and use interfaces for Map & Placemark.
They are not full and may contain errors, report about them to issues, please.
```
import { YandexMapModule } from 'angular8-yandex-maps/public-api';

public options: YandexMapModule.IYandexMapOptions;
```

## Version 0.3.0

- New parameters for the placemark

## License

[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)