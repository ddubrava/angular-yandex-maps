[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social)

# Angular8-yandex-maps
Angular 6+ module for Yandex.Maps

## Examples

- [Custom placemark](https://stackblitz.com/edit/custom-placemark)
- [Multiroute](https://stackblitz.com/edit/multiroute)
- [Rectangle](https://stackblitz.com/edit/rectangle)
- [Polygon](https://stackblitz.com/edit/geoobject-polygon)
- [Circle](https://stackblitz.com/edit/geoobject-circle)
- [Custom search](https://stackblitz.com/edit/custom-searchcontrol)
- [Search for organizations](https://stackblitz.com/edit/search-for-organizations)

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

Optional:
 - zoom: Number; default = 10
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
## Multiroute
Available inputs:

Required:
 - referencePoints:  [IMultiRouteReferencePoint](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/ "IMultiRouteReferencePoint")

Optional:
- multirouteModel: [multiRouter.MultiRouteModel](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/ "multiRouter.MultiRouteModel") | [IMultiRouteModelJson](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/ "IMultiRouteModelJson")

```
<angular-yandex-multiroute [referencePoints]="[[60.181711, 24.927661], 'helsinki']" [multirouteOptions]="{routeActiveStrokeColor: 'ff0000'}"></angular-yandex-multiroute>
```

## GeoObject
Available inputs:

Required:
- feature: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature)

Optional:
- options: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-options)

```
<angular-yandex-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[60.183155, 24.911892], [60.156454, 24.962433]] } }"></angular-yandex-geoobject>
```

## Search
Available inputs:

Optional:
- searchRequest: string (use this for force search, [Example](https://stackblitz.com/edit/search-for-organizations))
- parameters: [Interface](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters)

```
<angular-yandex-search [parameters]="{ options: { float: 'right' } }"></angular-yandex-search>
```

## Changelog
[CHANGELOG](https://github.com/ddubrava/angular-yandex-maps/blob/develop/CHANGELOG.md)

## License
[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)