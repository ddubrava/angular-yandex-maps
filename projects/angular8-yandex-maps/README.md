[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) [![Build Status](https://travis-ci.org/ddubrava/angular-yandex-maps.svg?branch=master)](https://travis-ci.org/ddubrava/angular-yandex-maps) ![npm bundle size](https://img.shields.io/bundlephobia/min/angular8-yandex-maps) ![npm](https://img.shields.io/npm/dm/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social)

# Angular8-yandex-maps
Angular-Yandex-Maps is an Angular library for simplifying work with the Yandex.Maps API. **Supports Angular 6+.**

The library implements the main components: map, panorama, placemark, geoobject, multiroute and controls. It also returns ymaps instance so you can use full API. For a more detailed description of inputs, outputs etc. check [API Yandex.Maps documentation](https://tech.yandex.ru/maps/jsapi/).

Leave suggestions, problems, errors, difficulties in GitHub Issues. Thanks for using the library!

## Documentation
[Documentation](https://ddubrava.github.io/angular-yandex-maps-docs/)

## Examples
[Examples](https://ddubrava.github.io/angular-yandex-maps-docs/docs/examples)

## Installation
```
npm install angular8-yandex-maps
```

## Usage
### app.module.ts
##### With default map config options
```
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule]
})
export class AppModule { }
```

##### Passing in your own map config options
```
import { AngularYandexMapsModule, IConfig } from 'angular8-yandex-maps';

const mapConfig: IConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(mapConfig)]
})
export class AppModule { }
```

### component.html
```
<div class="container">
  <angular-yandex-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <angular-yandex-placemark [geometry]="[55.751952, 37.600739]"></angular-yandex-placemark>
  </angular-yandex-map>
</div>
```

### component.css
```
.container {
  width: 1000px;
  height: 500px;
}
```

## Changelog
[CHANGELOG](https://github.com/ddubrava/angular-yandex-maps/blob/develop/CHANGELOG.md)

## License
[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)
