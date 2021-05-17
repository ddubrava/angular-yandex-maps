/** Creates a jasmine.SpyObj for a ymaps.Map. */
export function createMapSpy(): jasmine.SpyObj<ymaps.Map> {
  const spy = jasmine.createSpyObj(
    'ymaps.Map',
    ['setCenter', 'setZoom', 'setBounds', 'setType', 'destroy'],
    {
      events: jasmine.createSpyObj('events', ['add']),
      behaviors: jasmine.createSpyObj('behaviors', ['enable']),
      margin: jasmine.createSpyObj('margin', ['setDefaultMargin']),
      controls: jasmine.createSpyObj('controls', ['add']),
      options: jasmine.createSpyObj('controls', ['set']),
      geoObjects: jasmine.createSpyObj('geoObjects', ['add']),
    },
  );

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
  const spy = jasmine.createSpyObj('ymaps.Placemark', [], {
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
  placemarkSpy: jasmine.SpyObj<ymaps.Placemark>,
): jasmine.Spy {
  const placemarkConstructorSpy = jasmine
    .createSpy('Placemark constructor')
    .and.returnValue(placemarkSpy);

  window.ymaps = {
    Placemark: placemarkConstructorSpy,
  } as any;

  return placemarkConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.panorama.Player. */
export function createPlayerSpy(): jasmine.SpyObj<ymaps.panorama.Player> {
  const spy = jasmine.createSpyObj('ymaps.panorama.Player', ['moveTo', 'setDirection', 'setSpan'], {
    events: jasmine.createSpyObj('events', ['add']),
  });

  spy.events.add.and.returnValue({
    remove: () => {},
  });

  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.panorama.Player. */
export function createPlayerConstructorSpy(
  playerSpy: jasmine.SpyObj<ymaps.panorama.Player>,
): jasmine.Spy {
  const playerConstructorSpy = jasmine.createSpy('Player constructor').and.returnValue(playerSpy);

  window.ymaps = {
    panorama: {
      Player: playerConstructorSpy,
    },
  } as any;

  return playerConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.multiRouter.MultiRoute. */
export function createMultirouteSpy(): jasmine.SpyObj<ymaps.multiRouter.MultiRoute> {
  const spy = jasmine.createSpyObj(
    'ymaps.multiRouter.MultiRoute',
    ['moveTo', 'setDirection', 'setSpan'],
    {
      model: jasmine.createSpyObj('events', ['setReferencePoints', 'setParams']),
      events: jasmine.createSpyObj('events', ['add']),
      options: jasmine.createSpyObj('options', ['set']),
    },
  );

  spy.events.add.and.returnValue({
    remove: () => {},
  });

  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.multiRouter.MultiRoute. */
export function createMultirouteConstructorSpy(
  multirouteSpy: jasmine.SpyObj<ymaps.multiRouter.MultiRoute>,
): jasmine.Spy {
  const multirouteConstructorSpy = jasmine
    .createSpy('Multiroute constructor')
    .and.returnValue(multirouteSpy);

  window.ymaps = {
    multiRouter: {
      MultiRoute: multirouteConstructorSpy,
    },
  } as any;

  return multirouteConstructorSpy;
}
