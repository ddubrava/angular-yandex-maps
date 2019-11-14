[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social)

# Angular8-yandex-maps
Angular 6+ module for Yandex.Maps

If you liked the project and want to support the development please star the package on [GitHub page](https://github.com/ddubrava/angular-yandex-maps "GitHub page"). Thanks!
## Examples

- [Custom placemark](https://stackblitz.com/edit/custom-placemark)
- [Placemark clusterer](https://stackblitz.com/edit/placemark-clusterer)
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
  <angular-yandex-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <angular-yandex-placemark [geometry]="[55.751952, 37.600739]"></angular-yandex-placemark>
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
Inputs

| Name      | Type         | Default | Required | Description                                                                         |
|-----------|--------------|---------|----------|-------------------------------------------------------------------------------------|
| center    | Number[]     |         | yes      | Map center geocoordinates                                                           |
| zoom      | Number       | 10      | no       | Map zoom level                                                                      |
| state     | [MapState]   |         | no       | States for the map                                                                  |
| options   | [MapOptions] |         | no       | Options for the map                                                                 |
| clusterer | [Clusterer]  |         | no       | Options for the Clusterer. Clusters ONLY Placemarks in the visible area of the map. |


[MapState]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-state
[MapOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-options
[Clusterer]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/

------------

```
<angular-yandex-map [center]="[55.751952, 37.600739]" [zoom]="12" [state]="{type: 'yandex#satellite'}"></angular-yandex-map>
```

## Placemark
Inputs

| Name       | Type                                   | Default | Required | Description                  |
|------------|----------------------------------------|---------|----------|------------------------------|
| geometry   | Number[] or Object or [IPointGeometry] |         | yes      | Placemark coordinates or...read Yandex.Maps docs    |
| properties | [PlacemarkProperties]                  |         | no       | Properties for the placemark |
| options    | [PlacemarkOptions]                     |         | no       | States for the placemark     |

[IPointGeometry]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IPointGeometry-docpage
[PlacemarkProperties]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties
[PlacemarkOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options

------------

```
<angular-yandex-placemark [geometry]="[55.751952, 37.600739]" [properties]="{iconCaption: 'Moscow'}"></angular-yandex-placemark>
```

## MultiRoute
Inputs

| Name            | Type                                                    | Default | Required | Description                         |
|-----------------|---------------------------------------------------------|---------|----------|-------------------------------------|
| referencePoints | [IMultiRouteReferencePoint][][]                         |         | yes      | Reference points for the multi-route |
| model           | [multiRouter.MultiRouteModel] or  [MultiRouteModelJson] |         | no       | Properties for the multiroute       |
| options         | [MultiRouteOptions]                                     |         | no       | Options for the multiroute          |

[IMultiRouteReferencePoint]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/
[multiRouter.MultiRouteModel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/
[MultiRouteModelJson]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/
[multiRouter.MultiRouteModel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options
[MultiRouteOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options

------------

```
<angular-yandex-multiroute [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']" [options]="{routeActiveStrokeColor: 'ff0000'}"></angular-yandex-multiroute>
```

## GeoObject
Inputs

| Name    | Type               | Default | Required | Description               |
|---------|--------------------|---------|----------|---------------------------|
| feature | [GeoObjectFeature] |         | yes      | Feature for the GeoObject |
| options | [GeoObjectOptions] |         | no       | Options for the GeoObject |

[GeoObjectFeature]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature
[GeoObjectOptions]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-options

------------

```
<angular-yandex-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"></angular-yandex-geoobject>
```

## Search
Inputs

| Name          | Type                      | Default | Required | Description                                   |
|---------------|---------------------------|---------|----------|-----------------------------------------------|
| searchRequest | String                    |         | no       | Force search. Example: [SearchRequestExample] |
| parameters    | [SearchControlParameters] |         | no       | Parameters for the Search                     |

[SearchRequestExample]: https://stackblitz.com/edit/search-for-organizations
[SearchControlParameters]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters

------------

```
<angular-yandex-search [parameters]="{ options: { float: 'right' } }"></angular-yandex-search>
```

## Changelog
[CHANGELOG](https://github.com/ddubrava/angular-yandex-maps/blob/develop/CHANGELOG.md)

## License
[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)