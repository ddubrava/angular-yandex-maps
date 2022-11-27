# YaClustererComponent


The `ya-clusterer` component wraps `ymaps.Clusterer` class from the Yandex.Maps API.
You can configure it via the component's inputs.
Events can be bound using the outputs of the component.



```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-clusterer [options]="{ minClusterSize: 5 }">
    <ya-placemark [geometry]="[55.74, 37.5]"></ya-placemark>
    <ya-placemark [geometry]="[55.64, 37.46]"></ya-placemark>
    <ya-placemark [geometry]="[55.75, 37.38]"></ya-placemark>

    <ya-geoobject
      [feature]="{ geometry: { type: 'Point', coordinates: [55.81, 37.4] } }"
     ></ya-geoobject>

    <ya-geoobject
      [feature]="{ geometry: { type: 'Point', coordinates: [55.7, 37.39] } }"
     ></ya-geoobject>
  </ya-clusterer>
</ya-map>
```


## Example
[filename](https://stackblitz.com/edit/placemark-clusterer?embed=1&view=preview ':include :type=iframe width=100% height=650px')

## Inputs
| Name    | Description                                                                                 | Type | API Reference                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| options |   Clusterer options. Options for child cluster objects are set with the "cluster" prefix.   | -    | [Clusterer.html#Clusterer__param-options](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html#Clusterer__param-options) |

## Outputs
| Name          | Description                              | Type                                    | API Reference                                                                                                                                                        |
| ------------- | ---------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hintclose     |   Closing the hint.                      | [YaEvent](interfaces/YaEvent)           | [Clusterer.html#event_detail__event-hintclose](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html#event_detail__event-hintclose)                 |
| hintopen      |   Opening a hint on a map.               | [YaEvent](interfaces/YaEvent)           | [Clusterer.html#event_detail__event-hintopen](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html#event_detail__event-hintopen)                   |
| mapchange     |   Map reference changed.                 | [YaEvent](interfaces/YaEvent)           | [IParentOnMap.html#event_detail__event-mapchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange)           |
| optionschange |   Change to the object options.          | [YaEvent](interfaces/YaEvent)           | [ICustomizable.html#event_detail__event-optionschange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange) |
| parentchange  |   The parent object reference changed.   | [YaEvent](interfaces/YaEvent)           | [IChild.html#event_detail__event-parentchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange)                 |
| ready         |   Clusterer instance is added to a Map.  | [YaReadyEvent](interfaces/YaReadyEvent) | —                                                                                                                                                                    |