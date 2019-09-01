
# Angular8-yandex-maps

[Example](https://github.com/ddubrava/angular-yandex-maps/tree/develop/src/app)

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
  <angular-yandex-map [center]="[60.169931, 24.938513]" [zoom]="12" [mapOptions]="mapOptions">
    <angular-yandex-placemark [geometry]="[60.169931, 24.938513]"></angular-yandex-placemark>
    <angular-yandex-placemark [geometry]="[60.170817, 24.945757]"></angular-yandex-placemark>
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

### component.ts

```
import { YandexMapModule } from 'angular8-yandex-maps';

public mapOptions: YandexMapModule.IYandexMapOptions = {
  maxZoom:  12
};
```

## Version 0.2.2

- Placemark is added

- Inputs for yandex-map is changed

- Docs is updated

## Map 
Available inputs:

 - center: Array<number>
 - zoom: number
 - mapState: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/)
 - mapOptions: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/)

```
<angular-yandex-map [center]="[60.169931, 24.938513]" [zoom]="12" [mapOptions]="mapOptions" [mapState]="{margin: 20}"></angular-yandex-map>
```

## Placemark
Available inputs:

 - geometry: Array<number>

```
<angular-yandex-placemark [geometry]="[60.170817, 24.945757]"></angular-yandex-placemark>
```

## License

[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)