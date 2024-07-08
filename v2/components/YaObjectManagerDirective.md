# YaObjectManagerDirective


The `ya-object-manager` component wraps `ymaps.ObjectManager` class from the Yandex.Maps API.
You can configure it via the component's inputs.
Events can be bound using the outputs of the component.



```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-object-manager
    [options]="{ clusterize: true }"
    (ready)="onReady($event)"
  ></ya-object-manager>
</ya-map>
```


## Example
[filename](https://stackblitz.com/edit/object-manager?embed=1&view=preview ':include :type=iframe width=100% height=650px')

## Inputs
| Name    | Description                | Type                        | API Reference                                                                                                                                              |
| ------- | -------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options |   ObjectManager options.   | ymaps.IObjectManagerOptions | [ObjectManager.html#ObjectManager__param-options](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ObjectManager.html#ObjectManager__param-options) |

## Outputs
| Name             | Description                                                                           | Type                                            | API Reference                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| geometrychange   |   Change to the geo object geometry.                                                  | Observable<YaEvent<ymaps.ObjectManager>>        | [IGeoObject.html#event_detail__event-geometrychange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-geometrychange)               |
| mapchange        |   Map reference changed.                                                              | Observable<YaEvent<ymaps.ObjectManager>>        | [IParentOnMap.html#event_detail__event-mapchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange)                     |
| multitouchend    |   End of multitouch.                                                                  | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-multitouchend](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend)     |
| multitouchmove   |   Repeating event during multitouch.                                                  | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-multitouchmove](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove)   |
| multitouchstart  |   Start of multitouch.                                                                | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-multitouchstart](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart) |
| optionschange    |   Change to the object options.                                                       | Observable<YaEvent<ymaps.ObjectManager>>        | [ICustomizable.html#event_detail__event-optionschange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange)           |
| overlaychange    |   Change to the geo object overlay.                                                   | Observable<YaEvent<ymaps.ObjectManager>>        | [IGeoObject.html#event_detail__event-overlaychange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-overlaychange)                 |
| parentchange     |   The parent object reference changed.                                                | Observable<YaEvent<ymaps.ObjectManager>>        | [IChild.html#event_detail__event-parentchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange)                           |
| propertieschange |   Change to the geo object data.                                                      | Observable<YaEvent<ymaps.ObjectManager>>        | [IGeoObject.html#event_detail__event-propertieschange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-propertieschange)           |
| ready            |   ObjectManager instance is added to a Map. This event runs outside an Angular zone.  | EventEmitter<YaReadyEvent<ymaps.ObjectManager>> | —                                                                                                                                                                              |
| yaclick          |   Single left-click on the object.                                                    | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-click](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click)                     |
| yacontextmenu    |   Calls the element's context menu.                                                   | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-contextmenu](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu)         |
| yadblclick       |   Double left-click on the object.                                                    | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-dblclick](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick)               |
| yamousedown      |   Pressing the mouse button over the object.                                          | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-mousedown](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown)             |
| yamouseenter     |   Pointing the cursor at the object.                                                  | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-mouseenter](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter)           |
| yamouseleave     |   Moving the cursor off of the object.                                                | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-mouseleave](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave)           |
| yamousemove      |   Moving the cursor over the object.                                                  | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-mousemove](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove)             |
| yamouseup        |   Letting go of the mouse button over an object.                                      | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-mouseup](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup)                 |
| yawheel          |   Mouse wheel scrolling.                                                              | Observable<YaEvent<ymaps.ObjectManager>>        | [IDomEventEmitter.html#event_detail__event-wheel](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel)                     |