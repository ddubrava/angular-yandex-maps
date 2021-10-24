import { Observable } from 'rxjs';

/*
 * The global `window` variable is typed as an intersection of `Window` and `globalThis`.
 * We re-declare `window` here and omit `globalThis` as it is typed with the actual Yandex Maps
 * types which we intend to override with jasmine spies for testing. Keeping `globalThis`
 * would mean that `window` is not assignable to our testing window.
 */
declare let window: Window;

interface TestingWindow extends Window {
  ymaps?: {
    ready?: jasmine.Spy;
    geocode?: jasmine.Spy;
    Map?: jasmine.Spy;
    Placemark?: jasmine.Spy;
    GeoObject?: jasmine.Spy;
    Clusterer?: jasmine.Spy;
    panorama?: {
      Player?: jasmine.Spy;
    };
    multiRouter?: {
      MultiRoute?: jasmine.Spy;
    };
    control?: {
      RoutePanel?: jasmine.Spy;
    };
  };
}

/** Creates a jasmine.Spy for a ymaps.ready. */
export function createReadySpy(): jasmine.Spy<jasmine.Func> {
  const readySpy = jasmine
    .createSpy('ready')
    .and.returnValue(new Observable((observer) => observer.next()));

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.ready = readySpy;
  } else {
    testingWindow.ymaps = {
      ready: readySpy,
    };
  }

  return readySpy;
}

/** Creates a jasmine.Spy for a ymaps.load. */
export function createGeocoderSpy(): jasmine.Spy<jasmine.Func> {
  const geocodeSpy = jasmine.createSpy('geocode').and.returnValue(Promise.resolve({}));

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.geocode = geocodeSpy;
  } else {
    testingWindow.ymaps = {
      geocode: geocodeSpy,
    };
  }

  return geocodeSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.Map. */
export function createMapSpy(): jasmine.SpyObj<ymaps.Map> {
  const spy = jasmine.createSpyObj(
    'ymaps.Map',
    ['setCenter', 'setZoom', 'setBounds', 'setType', 'destroy'],
    {
      events: jasmine.createSpyObj('events', ['add']),
      behaviors: jasmine.createSpyObj('behaviors', ['enable']),
      margin: jasmine.createSpyObj('margin', ['setDefaultMargin']),
      controls: jasmine.createSpyObj('controls', ['add', 'remove']),
      options: jasmine.createSpyObj('controls', ['set']),
      geoObjects: jasmine.createSpyObj('geoObjects', ['add', 'remove']),
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

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.Map = mapConstructorSpy;
  } else {
    testingWindow.ymaps = {
      Map: mapConstructorSpy,
    };
  }

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

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.Placemark = placemarkConstructorSpy;
  } else {
    testingWindow.ymaps = {
      Placemark: placemarkConstructorSpy,
    };
  }

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

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.panorama = {
      Player: playerConstructorSpy,
    };
  } else {
    testingWindow.ymaps = {
      panorama: {
        Player: playerConstructorSpy,
      },
    };
  }

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

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.multiRouter = {
      MultiRoute: multirouteConstructorSpy,
    };
  } else {
    testingWindow.ymaps = {
      multiRouter: {
        MultiRoute: multirouteConstructorSpy,
      },
    };
  }

  return multirouteConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.GeoObject. */
export function createGeoObjectSpy(): jasmine.SpyObj<ymaps.GeoObject> {
  const spy = jasmine.createSpyObj('ymaps.GeoObject', [], {
    events: jasmine.createSpyObj('events', ['add']),
    properties: jasmine.createSpyObj('properties', ['set']),
    options: jasmine.createSpyObj('options', ['set']),
  });

  spy.events.add.and.returnValue({
    remove: () => {},
  });

  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.GeoObject. */
export function createGeoObjectConstructorSpy(
  geoObjectSpy: jasmine.SpyObj<ymaps.GeoObject>,
): jasmine.Spy {
  const geoObjectConstructorSpy = jasmine
    .createSpy('GeoObject constructor')
    .and.returnValue(geoObjectSpy);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.GeoObject = geoObjectConstructorSpy;
  } else {
    testingWindow.ymaps = {
      GeoObject: geoObjectConstructorSpy,
    };
  }

  return geoObjectConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.control.RoutePanel. */
export function createRoutePanelSpy(): jasmine.SpyObj<ymaps.control.RoutePanel> {
  return jasmine.createSpyObj('ymaps.GeoObject', [], {
    routePanel: jasmine.createSpyObj('routePanel', [], {
      state: jasmine.createSpyObj('state', ['set']),
    }),
  });
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.control.RoutePanel. */
export function createRoutePanelConstructorSpy(
  routePanelSpy: jasmine.SpyObj<ymaps.control.RoutePanel>,
): jasmine.Spy {
  const routePanelConstructorSpy = jasmine
    .createSpy('GeoObject constructor')
    .and.returnValue(routePanelSpy);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.control = {
      RoutePanel: routePanelConstructorSpy,
    };
  } else {
    testingWindow.ymaps = {
      control: {
        RoutePanel: routePanelConstructorSpy,
      },
    };
  }

  return routePanelConstructorSpy;
}

/** Creates a jasmine.SpyObj for a ymaps.Clusterer. */
export function createClustererSpy(): jasmine.SpyObj<ymaps.Clusterer> {
  const spy = jasmine.createSpyObj('ymaps.Clusterer', ['add', 'remove'], {
    events: jasmine.createSpyObj('events', ['add']),
    options: jasmine.createSpyObj('options', ['set']),
  });

  spy.events.add.and.returnValue({
    remove: () => {},
  });

  return spy;
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.Clusterer. */
export function createClustererConstructorSpy(
  clustererSpy: jasmine.SpyObj<ymaps.Clusterer>,
): jasmine.Spy {
  const clustererConstructorSpy = jasmine
    .createSpy('Clusterer constructor')
    .and.returnValue(clustererSpy);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps) {
    testingWindow.ymaps.Clusterer = clustererConstructorSpy;
  } else {
    testingWindow.ymaps = {
      Clusterer: clustererConstructorSpy,
    };
  }

  return clustererConstructorSpy;
}
