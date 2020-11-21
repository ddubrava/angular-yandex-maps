# Clusterer

Directive for creating a clusterer. Clusterizes objects in the visible area of the map.
If the object does not fall within the visible area of the map, it will not be added to the map.
Note, that the clusterer does not react to changing the coordinates of objects (either programmatically,
or as the result of dragging). If you want to change the coordinates of some object in the clusterer,
you should first delete the object from the clusterer and then add it back

[Clusterer](https://placemark-clusterer.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map [center]="[55.74, 37.58]">
  <ya-clusterer>
    <ya-placemark [geometry]="[55.74, 37.50]"></ya-placemark>
    <ya-geoobject
      [feature]="{ geometry: { type: 'Point', coordinates: [55.73, 37.52] } }"
    ></ya-geoobject>
  </ya-clusterer>
</ya-map>
```

## Inputs

| Name    | Type               | Default | Required | Description               |
| ------- | ------------------ | ------- | -------- | ------------------------- |
| options | [ClustererOptions] |         | no       | Options for the clusterer |

[clustereroptions]: https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/#Clusterer__param-options

## Outputs

All events execute within the Angular zone

| Name          | Type           | Inside the angular zone | Description                         |
| ------------- | -------------- | ----------------------- | ----------------------------------- |
| ready         | [YaReadyEvent] | yes                     | Entity is added in root container   |
| hintclose     | [YaEvent]      | hintopen, hintclose     | Closing the hint                    |
| hintopen      | [YaEvent]      | mapChange               | Opening a hint on a cluster         |
| mapchange     | [YaEvent]      | optionsChange           | Map reference changed               |
| optionschange | [YaEvent]      | parentChange            | Change to the object options        |
| parentchange  | [YaEvent]      | parentChange            | The parent object reference changed |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## ContentChildren

- [Placemark](directives/placemark.md)
- [GeoObject](directives/geoobject.md)

## Source

- [lib/directives/ya-clusterer](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-clusterer)
- [jsapi/doc/2.1/ref/reference/Clusterer.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html)
