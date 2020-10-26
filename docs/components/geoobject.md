# GeoObject

Component for creating a geo object. Can be displayed as a placemark, polyline, polygon, etc., depending on the geometry type

[GeoObject](https://geoobject-polygon.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-geoobject
    [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"
  ></ya-geoobject>
</ya-map>
```

## Inputs

| Name    | Type               | Default | Required | Description               |
| ------- | ------------------ | ------- | -------- | ------------------------- |
| feature | [GeoObjectFeature] |         | yes      | Feature for the GeoObject |
| options | [GeoObjectOptions] |         | no       | Options for the GeoObject |

[geoobjectfeature]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature
[geoobjectoptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-options

## Outputs

All events execute within the Angular zone

| Name       | Type         | Supported event type                                  | Description                                                    |
| ---------- | ------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| balloon    | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick    | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| drag       | [IEvent]     | dragstart, dragend                                    | GeoObject dragging                                             |
| hint       | [IEvent]     | hintopen, hintclose                                   | Actions with the hint                                          |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[iloadevent]: interfaces/load-event.md
[ievent]: interfaces/event.md

## Examples

- [Rectangle](https://stackblitz.com/edit/rectangle)
- [Polygon](https://stackblitz.com/edit/geoobject-polygon)
- [Circle](https://stackblitz.com/edit/geoobject-circle)

## Source

- [lib/components/ya-geoobject](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-geoobject)
- [jsapi/doc/2.1/ref/reference/GeoObject.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html/)
