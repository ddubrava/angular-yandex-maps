[![npm version](https://badge.fury.io/js/angular8-yandex-maps.svg)](https://badge.fury.io/js/angular8-yandex-maps) ![npm bundle size](https://img.shields.io/bundlephobia/min/angular8-yandex-maps) ![GitHub stars](https://img.shields.io/github/stars/ddubrava/angular-yandex-maps?style=social) 

# Angular8-yandex-maps
Angular 6+ module for Yandex.Maps

If you liked the project and want to support the development please star the package on [GitHub page](https://github.com/ddubrava/angular-yandex-maps "GitHub page"). Thanks!

Full documentation about events, options, properties etc. you can find [here](https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/concepts/About-docpage/).

## Table of Contents
- [Map*](#map)
- [Panorama*](#panorama)
- [Placemark](#placemark)
- [GeoObject](#geoobject)
- [MultiRoute](#multiroute)
- [Control](#control)

## Examples
##### Popular
- [Using a custom image for the placemark](https://stackblitz.com/edit/custom-placemark)
- [Efficiently adding lots of placemarks to the map](https://stackblitz.com/edit/placemark-clusterer)
- [Route to the point on the map](https://stackblitz.com/edit/route-to)
- [Searching for organizations](https://stackblitz.com/edit/search-for-organizations)

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
  imports: [AngularYandexMapsModule.forRoot(API_KEY or null)]
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

## Map*
#### Asterisk means root container, they can not be nested
##### Inputs

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

##### Outputs
| Name       | Type     | Description                                                                                            |
|------------|----------|--------------------------------------------------------------------------------------------------------|
| load       | [IEvent] | Emit immediately after entity is added in root container                                               |
| action     | [IEvent] | Smooth map movement. Supported events: actionbegin, actionend                                          |
| baloon     | [IEvent] | Actions with ballon. Supported events: balloonopen, balloonclose                                       |
| yaclick    | [IEvent] | Clicks on the object. Supported events: click, dblclick                                                |
| hint       | [IEvent] | Action with hint. Supported events: hintopen, hintclose                                                |
| mouse      | [IEvent] | Mouse actions over the object. Supported events: mousedown, mouseenter, mouseleave, mousemove, mouseup |
| multitouch | [IEvent] | Multitouch actions over the object. Supported events: multitouchstart, multitouchmove, multitouchend   |

[Map]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/

##### Children
- [Placemark](#placemark)
- [MultiRoute](#multiroute)
- [GeoObject](#geoobject)
- [Control](#control)

------------

```
<angular-yandex-map [center]="[55.751952, 37.600739]" [zoom]="12" [state]="{type: 'yandex#satellite'}"></angular-yandex-map>
```

## Panorama*
##### Inputs

| Name    | Type                                       | Default           | Required | Description                                      |
|---------|--------------------------------------------|-------------------|----------|--------------------------------------------------|
| point   | Number[]                                   |                   | yes      | Map center geocoordinates                        |
| layer   | yandex#panorama or  yandex#airPanorama | yandex#panorama | no       | The layer in which the panorama will be searched |
| options | [PanoramaOptions]                          |                   | no       | Options for the panorama                         |

[PanoramaOptions]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Player__param-options

##### Outputs
| Name            | Type     | Description                                                                                              |
|-----------------|----------|----------------------------------------------------------------------------------------------------------|
| load            | [IEvent] | Emit immediately after entity is added in root container                                                 |
| directionchange | [IEvent] | The view direction changed                                                                               |
| fullscreen      | [IEvent] | Full-screen mode was switched. Supported events: fullscreenenter, fullscreenexit                         |
| marker          | [IEvent] | Clicks on the marker. Supported events: markercollapse, markerexpand, markermouseenter, markermouseleave |

[Player]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/

##### Children
- None

------------

```
<angular-yandex-panorama [point]="[59.938557, 30.316198]" [layer]="'yandex#airPanorama'"></angular-yandex-panorama>
```

## Placemark
##### Inputs

| Name       | Type                                   | Default | Required | Description                                      |
|------------|----------------------------------------|---------|----------|--------------------------------------------------|
| geometry   | Number[] or Object or [IPointGeometry] |         | yes      | Placemark coordinates or...read Yandex.Maps docs |
| properties | [PlacemarkProperties]                  |         | no       | Properties for the placemark                     |
| options    | [PlacemarkOptions]                     |         | no       | States for the placemark                         |

[IPointGeometry]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IPointGeometry-docpage
[PlacemarkProperties]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties
[PlacemarkOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options

##### Outputs
| Name       | Type     | Description                                                                                            |
|------------|----------|--------------------------------------------------------------------------------------------------------|
| load       | [IEvent] | Emit immediately after entity is added in root container                                               |
| baloon     | [IEvent] | Actions with ballon. Supported events: balloonopen, balloonclose                                       |
| yaclick    | [IEvent] | Clicks on the object. Supported events: click, dblclick                                                |
| drag       | [IEvent] | Placemark dragging. Supported events: dragstart, dragend                                               |
| hint       | [IEvent] | Action with hint. Supported events: hintopen, hintclose                                                |
| mouse      | [IEvent] | Mouse actions over the object. Supported events: mousedown, mouseenter, mouseleave, mousemove, mouseup |
| multitouch | [IEvent] | Multitouch actions over the object. Supported events: multitouchstart, multitouchmove, multitouchend   |

[GeoObject]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IGeoObject-docpage/

------------

```
<angular-yandex-placemark [geometry]="[55.751952, 37.600739]" [properties]="{ iconCaption: 'Moscow' }"></angular-yandex-placemark>
```

## GeoObject
##### Inputs

| Name    | Type               | Default | Required | Description               |
|---------|--------------------|---------|----------|---------------------------|
| feature | [GeoObjectFeature] |         | yes      | Feature for the GeoObject |
| options | [GeoObjectOptions] |         | no       | Options for the GeoObject |

[GeoObjectFeature]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature
[GeoObjectOptions]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-options

##### Outputs
| Name       | Type     | Description                                                                                            |
|------------|----------|--------------------------------------------------------------------------------------------------------|
| load       | [IEvent] | Emit immediately after entity is added in root container                                               |
| baloon     | [IEvent] | Actions with ballon. Supported events: balloonopen, balloonclose                                       |
| yaclick    | [IEvent] | Clicks on the object. Supported events: click, dblclick                                                |
| drag       | [IEvent] | GeoObject dragging. Supported events: dragstart, dragend                                               |
| hint       | [IEvent] | Action with hint. Supported events: hintopen, hintclose                                                |
| mouse      | [IEvent] | Mouse actions over the object. Supported events: mousedown, mouseenter, mouseleave, mousemove, mouseup |
| multitouch | [IEvent] | Multitouch actions over the object. Supported events: multitouchstart, multitouchmove, multitouchend   |

[GeoObject]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IGeoObject-docpage/

------------

```
<angular-yandex-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"></angular-yandex-geoobject>
```

## MultiRoute
##### Inputs

| Name            | Type                                                    | Default | Required | Description                          |
|-----------------|---------------------------------------------------------|---------|----------|--------------------------------------|
| referencePoints | [IMultiRouteReferencePoint][][]                         |         | yes      | Reference points for the multi-route |
| model           | [multiRouter.MultiRouteModel] or  [MultiRouteModelJson] |         | no       | Properties for the multiroute        |
| options         | [MultiRouteOptions]                                     |         | no       | Options for the multiroute           |

[IMultiRouteReferencePoint]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/
[multiRouter.MultiRouteModel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/
[MultiRouteModelJson]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/
[multiRouter.MultiRouteModel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options
[MultiRouteOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options

##### Outputs
| Name              | Type     | Description                                                                                            |
|-------------------|----------|--------------------------------------------------------------------------------------------------------|
| load              | [IEvent] | Emit immediately after entity is added in root container                                               |
| activeroutechange | [IEvent] | Change to the active route                                                                             |
| baloon            | [IEvent] | Actions with ballon. Supported events: balloonopen, balloonclose                                       |
| yaclick           | [IEvent] | Clicks on the object. Supported events: click, dblclick                                                |
| mouse             | [IEvent] | Mouse actions over the object. Supported events: mousedown, mouseenter, mouseleave, mousemove, mouseup |
| multitouch        | [IEvent] | Multitouch actions over the object. Supported events: multitouchstart, multitouchmove, multitouchend   |

[multiRouter.MultiRoute]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/

------------

```
<angular-yandex-multiroute [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']" [options]="{ routeActiveStrokeColor: 'ff0000' }"></angular-yandex-multiroute>
```

## Control
##### Inputs
| Name       | Type   | Default | Required | Description                                                                                                              |
|------------|--------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| type       | String |         | yes      | Control type. List of types you can find in left list - [Controls]. E.g. Control.FullscreenControl - 'FullscreenControl' |
| parameters | any    |         | no       | Parameters for the Control                                                                                               |

[Controls]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.Button-docpage/

##### Outputs
| Name   | Type    | Description                                              |
|--------|---------|----------------------------------------------------------|
| load | Control | Emit immediately after entity is added in root container   |

------------

```
<angular-yandex-control [type]="'RoutePanel'" [parameters]="{ options: { float: 'right' } }"></angular-yandex-control>
```

## Changelog
[CHANGELOG](https://github.com/ddubrava/angular-yandex-maps/blob/develop/CHANGELOG.md)

## License
[MIT](https://github.com/ddubrava/angular-yandex-maps/blob/develop/LICENSE.md)

[IEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/types/types.ts