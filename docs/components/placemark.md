# Placemark

Component for creating a geo object with the geometry geometry.Point

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
</ya-map>
```

## Inputs

| Name       | Type                                   | Default | Required | Description                                                                                                  |
|------------|----------------------------------------|---------|----------|--------------------------------------------------------------------------------------------------------------|
| geometry   | Number[] or Object or [IPointGeometry] |         | yes      | Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object |
| properties | [PlacemarkProperties]                  |         | no       | Properties for the placemark                                                                                 |
| options    | [PlacemarkOptions]                     |         | no       | Options for the placemark                                                                                    |

[IPointGeometry]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IPointGeometry-docpage
[PlacemarkProperties]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties
[PlacemarkOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options

## Outputs

All events execute within the Angular zone

| Name       | Type         | Supported event type                                  | Description                                                    |
|------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| balloon    | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick    | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| drag       | [IEvent]     | dragstart, dragend                                    | Placemark dragging                                             |
| hint       | [IEvent]     | hintopen, hintclose                                   | Actions with the hint                                          |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[ILoadEvent]: interfaces/load-event.md
[IEvent]: interfaces/event.md

## Examples

- [Changing a placemark icon when hovering over it](https://stackblitz.com/edit/changing-a-placemark-on-hover)

## Source

[lib/components/ya-placemark](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-placemark)
