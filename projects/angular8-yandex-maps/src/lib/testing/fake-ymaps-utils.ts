/** Creates a jasmine.SpyObj for a ymaps.Map. */
export function createMapSpy(): jasmine.SpyObj<ymaps.Map> {
  const spy = jasmine.createSpyObj('ymaps.Map', ['setCenter', 'setZoom', 'setBounds', 'setType'], {
    events: jasmine.createSpyObj('events', ['add']),
    behaviors: jasmine.createSpyObj('behaviors', ['enable']),
    margin: jasmine.createSpyObj('margin', ['setDefaultMargin']),
    controls: jasmine.createSpyObj('controls', ['add']),
    options: jasmine.createSpyObj('controls', ['set']),
    geoObjects: jasmine.createSpyObj('geoObjects', ['add']),
  });

  spy.events.add.and.returnValue({
    remove: () => {},
  });
  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.Map. */
export function createMapConstructorSpy(mapSpy: jasmine.SpyObj<ymaps.Map>): jasmine.Spy {
  const mapConstructorSpy = jasmine.createSpy('Map constructor').and.returnValue(mapSpy);

  window.ymaps = {
    Map: mapConstructorSpy,
  } as any;

  return mapConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.Placemark. */
export function createPlacemarkSpy(): jasmine.SpyObj<ymaps.Placemark> {
  const spy = jasmine.createSpyObj('ymaps.Map', [], {
    events: jasmine.createSpyObj('events', ['add']),
    geometry: jasmine.createSpyObj('geometry', ['setCoordinates']),
    properties: jasmine.createSpyObj('properties', ['set']),
    options: jasmine.createSpyObj('options', ['set']),
  });

  spy.events.add.and.returnValue({
    remove: () => {},
  });
  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.Placemark. */
export function createPlacemarkConstructorSpy(
  mapSpy: jasmine.SpyObj<ymaps.Placemark>,
): jasmine.Spy {
  const placemarkConstructorSpy = jasmine
    .createSpy('Placemark constructor')
    .and.returnValue(mapSpy);

  window.ymaps = {
    Placemark: placemarkConstructorSpy,
  } as any;

  return placemarkConstructorSpy;
}
