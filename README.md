[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) [![Build Status](https://travis-ci.org/ddubrava/angular-yandex-maps.svg?branch=master)](https://travis-ci.org/ddubrava/angular-yandex-maps) ![npm bundle size](https://img.shields.io/bundlephobia/min/angular8-yandex-maps) ![npm](https://img.shields.io/npm/dm/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social)

# Angular8-yandex-maps
The library implements the base Yandex.Maps functionality. By the way you can access to the ymaps instance so you can use full Yandex.Maps API.

Leave suggestions, problems, errors, difficulties in GitHub Issues. Star the repository and thanks for using the library!

## Documentation
[Documentation](https://ddubrava.github.io/angular-yandex-maps/)

## Examples
[Examples](https://ddubrava.github.io/angular-yandex-maps/#/examples)

## Installation
```
npm install angular8-yandex-maps
```

## Usage
### app.module.ts
##### Default map config options
```
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule]
})
export class AppModule { }
```

##### Own map config options
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

##### Injection token
```
import { AngularYandexMapsModule, YA_MAP_CONFIG } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
  providers: [{
    provide: YA_MAP_CONFIG,
    useValue: {
      apikey: 'API_KEY',
      lang: 'en_US',
    }
  }],
})
export class AppModule { }
```

### component.html
```
<div class="container">
  <ya-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
  </ya-map>
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
