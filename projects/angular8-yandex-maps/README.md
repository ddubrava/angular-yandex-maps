[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) [![Build Status](https://travis-ci.org/ddubrava/angular-yandex-maps.svg?branch=master)](https://travis-ci.org/ddubrava/angular-yandex-maps) ![npm bundle size](https://img.shields.io/bundlephobia/min/angular8-yandex-maps) ![npm](https://img.shields.io/npm/dm/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social)

# Angular8-yandex-maps
Angular-Yandex-Maps is an Angular library for simplifying work with the Yandex.Maps API. **Supports Angular 6+.**

The library implements the main components: map, panorama, placemark, geoobject, multiroute and controls. It also returns ymaps instance so you can use full API. For a more detailed description of inputs, outputs etc. check [API Yandex.Maps documentation](https://tech.yandex.ru/maps/jsapi/).

Leave suggestions, problems, errors, difficulties in GitHub Issues. Thanks for using the library!

## Documentation
[Documentation](https://ddubrava.github.io/angular-yandex-maps-docs/)

## Examples
##### Popular
- [Using a custom image for the placemark](https://stackblitz.com/edit/custom-placemark)
- [Efficiently adding lots of placemarks to the map](https://stackblitz.com/edit/placemark-clusterer)
- [Route to the point on the map](https://stackblitz.com/edit/route-to)
- [Searching for organizations](https://stackblitz.com/edit/search-for-organizations)
- [Calculating delivery cost](https://stackblitz.com/edit/calculating-delivery-cost)
- [Using geocoder without creating map](https://stackblitz.com/edit/only-ymaps-instance)

##### Panorama
- [Panorama](https://stackblitz.com/edit/panorama)

##### GeoObjects
- [Changing a placemark icon when hovering over it](https://stackblitz.com/edit/changing-a-placemark-on-hover)
- [Rectangle](https://stackblitz.com/edit/rectangle)
- [Polygon](https://stackblitz.com/edit/geoobject-polygon)
- [Circle](https://stackblitz.com/edit/geoobject-circle)

##### Multiroute
- [Building a driving multiroute](https://stackblitz.com/edit/multiroute)
- [Building a pedestrian multiroute](https://stackblitz.com/edit/multiroute-pedestrian)

##### Controls
- [Search Control](https://stackblitz.com/edit/searchcontrol)
- [RoutePanel Control](https://stackblitz.com/edit/route-panel)

## Installation
```
npm install angular8-yandex-maps
```

## Usage
### module.ts
```
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(API_KEY)]
  /**
   * forRoot & API_KEY are optional
   * imports: [AngularYandexMapsModule]
   */
})
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
