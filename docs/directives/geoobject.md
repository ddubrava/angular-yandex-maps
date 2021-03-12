# GeoObject

Directive for creating a geo object. Can be displayed as a placemark, polyline, polygon, etc., depending on the geometry type

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

| Name              | Type           | Inside the angular zone | Description                                                     |
| ----------------- | -------------- | ----------------------- | --------------------------------------------------------------- |
| ready             | [YaReadyEvent] | yes                     | GeoObject instance is added in a Map/Clusterer                  |
| balloonclose      | [YaEvent]      | yes                     | Closing the balloon                                             |
| balloonopen       | [YaEvent]      | yes                     | Opening a balloon on a map                                      |
| beforedrag        | [YaEvent]      | yes                     | Event preceding the "drag" event                                |
| beforedragstart   | [YaEvent]      | yes                     | Event preceding the "dragstart" event                           |
| yaclick           | [YaEvent]      | yes                     | Single left-click on the object                                 |
| yacontextmenu     | [YaEvent]      | yes                     | Calls the element's context menu                                |
| yadbclick         | [YaEvent]      | yes                     | Double left-click on the object                                 |
| drag              | [YaEvent]      | yes                     | Dragging a geo object                                           |
| dragend           | [YaEvent]      | yes                     | End of geo object dragging                                      |
| dragstart         | [YaEvent]      | yes                     | Start of geo object dragging                                    |
| editorstatechange | [YaEvent]      | yes                     | Change in the state of the editor for the geo object's geometry |
| geometrychange    | [YaEvent]      | yes                     | Change to the geo object geometry                               |
| hintclose         | [YaEvent]      | yes                     | Closing the hint                                                |
| hintopen          | [YaEvent]      | yes                     | Opening a hint on a map                                         |
| mapchange         | [YaEvent]      | yes                     | Map reference changed                                           |
| yamousedown       | [YaEvent]      | yes                     | Pressing the mouse button over the object                       |
| yamouseenter      | [YaEvent]      | no                      | Pointing the cursor at the object                               |
| yamouseleave      | [YaEvent]      | no                      | Moving the cursor off of the object                             |
| yamousemove       | [YaEvent]      | no                      | Moving the cursor over the object                               |
| yamouseup         | [YaEvent]      | no                      | Letting go of the mouse button over an object                   |
| multitouchend     | [YaEvent]      | no                      | End of multitouch                                               |
| multitouchmove    | [YaEvent]      | no                      | Repeating event during multitouch                               |
| multitouchstart   | [YaEvent]      | no                      | Start of multitouch                                             |
| optionschange     | [YaEvent]      | yes                     | Change to the object options                                    |
| overlaychange     | [YaEvent]      | yes                     | Change to the geo object overlay                                |
| parentchange      | [YaEvent]      | yes                     | The parent object reference changed                             |
| propertieschange  | [YaEvent]      | yes                     | Change to the geo object data                                   |
| yawheel           | [YaEvent]      | yes                     | Mouse wheel scrolling                                           |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## Source

- [lib/directives/ya-geoobject](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-geoobject)
- [jsapi/doc/2.1/ref/reference/GeoObject.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html/)
