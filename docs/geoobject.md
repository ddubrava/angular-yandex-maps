# GeoObject

Component that can be displayed as a placemark, polyline, polygon, etc., depending on the geometry type.

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"></ya-geoobject>
</ya-map>
```

## Inputs

| Name    | Type               | Default | Required | Description               |
|---------|--------------------|---------|----------|---------------------------|
| feature | [GeoObjectFeature] |         | yes      | Feature for the GeoObject |
| options | [GeoObjectOptions] |         | no       | Options for the GeoObject |

[GeoObjectFeature]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature
[GeoObjectOptions]:https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-options

## Outputs

| Name       | Type         | Supported event type                                  | Description                                                    |
|------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| baloon     | [IEvent]     | balloonopen, balloonclose                             | Actions with ballon                                            |
| yaclick    | [IEvent]     | click, dblclick                                       | Clicks on the object                                           |
| drag       | [IEvent]     | dragstart, dragend                                    | GeoObject dragging                                             |
| hint       | [IEvent]     | hintopen, hintclose                                   | Action with hint                                               |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions over the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions over the object                             |

[ILoadEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L23
[IEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L34

## Examples

- [Rectangle](https://stackblitz.com/edit/rectangle)
- [Polygon](https://stackblitz.com/edit/geoobject-polygon)
- [Circle](https://stackblitz.com/edit/geoobject-circle)
