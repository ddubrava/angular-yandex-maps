interface TestingWindow extends Window {
  ymaps3?: {
    YMap?: jest.Mock;
    YMapControl?: jest.Mock;
    YMapControlButton?: jest.Mock;
    YMapControlCommonButton?: jest.Mock;
    YMapControls?: jest.Mock;
    YMapDefaultFeaturesLayer?: jest.Mock;
    YMapDefaultSchemeLayer?: jest.Mock;
    YMapFeature?: jest.Mock;
    YMapFeatureDataSource?: jest.Mock;
    YMapGeolocationControl?: jest.Mock;
    YMapGroupEntity?: jest.Mock;
    YMapLayer?: jest.Mock;
    YMapListener?: jest.Mock;
    YMapMarker?: jest.Mock;
    YMapOpenMapsButton?: jest.Mock;
    YMapScaleControl?: jest.Mock;
    YMapZoomControl?: jest.Mock;
    import?: jest.Mock;
    ready?: Promise<void>;
  };
  __chunk_yandex_ymaps3?: unknown[];
}

/**
 * Mocks ymaps3.ready.
 */
export const mockReady = (): Promise<void> => {
  const readyMock = Promise.resolve();

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.ready = readyMock;
  } else {
    testingWindow.ymaps3 = {
      ready: readyMock,
    };
  }

  return readyMock;
};

// mockImport can be called with different constructors, if a module returns multiple entities.
// So we need to store all of them and return them as an object.
const imports: Record<string, unknown> = {};

/**
 * Mocks ymaps3.import.
 */
export const mockImport = (constructorName: string, constructor: unknown): jest.Mock => {
  imports[constructorName] = constructor;

  const importMock = jest.fn(() => {
    // The API does this thing; we rely on this logic when updating the configuration.
    if (!testingWindow.__chunk_yandex_ymaps3) {
      testingWindow.__chunk_yandex_ymaps3 = [];
    }

    testingWindow.__chunk_yandex_ymaps3 = Object.keys(imports);

    return Promise.resolve(imports);
  });

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.import = importMock;
  } else {
    testingWindow.ymaps3 = {
      import: importMock,
    };
  }

  return importMock;
};

/**
 * Mocks a ymaps3.YMap instance.
 */
export const mockYMapInstance = () => ({
  addChild: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
});

/**
 * Mocks a ymaps3.YMap class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapConstructor = (instance: ReturnType<typeof mockYMapInstance>): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMap = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMap: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapLayer instance.
 */
export const mockYMapLayerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapLayer class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapLayerConstructor = (
  instance: ReturnType<typeof mockYMapLayerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapLayer = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapLayer: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapDefaultFeaturesLayerDirective instance.
 */
export const mockYMapDefaultFeaturesLayerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapDefaultFeaturesLayerDirective class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapDefaultFeaturesLayerConstructor = (
  instance: ReturnType<typeof mockYMapDefaultFeaturesLayerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapDefaultFeaturesLayer = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapDefaultFeaturesLayer: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-markers@X.X.X').YMapDefaultMarker instance.
 */
export const mockYMapDefaultMarkerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-markers@X.X.X').YMapDefaultMarker class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapDefaultMarkerConstructor = (
  instance: ReturnType<typeof mockYMapDefaultMarkerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapDefaultMarker', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapDefaultSchemeLayer instance.
 */
export const mockYMapDefaultSchemeLayerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapDefaultSchemeLayer class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapDefaultSchemeLayerConstructor = (
  instance: ReturnType<typeof mockYMapDefaultSchemeLayerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapDefaultSchemeLayer = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapDefaultSchemeLayer: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapFeature instance.
 */
export const mockYMapFeatureInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapDefaultSchemeLayer class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapFeatureConstructor = (
  instance: ReturnType<typeof mockYMapFeatureInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapFeature = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapFeature: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapListener instance.
 */
export const mockYMapListenerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapListener class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapListenerConstructor = (
  instance: ReturnType<typeof mockYMapListenerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapListener = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapListener: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapMarker instance.
 */
export const mockYMapMarkerInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapMarker class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapMarkerConstructor = (
  instance: ReturnType<typeof mockYMapMarkerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapMarker = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapMarker: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapControl instance.
 */
export const mockYMapControlInstance = () => ({
  update: jest.fn(),
  addChild: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapControl class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapControlConstructor = (
  instance: ReturnType<typeof mockYMapControlInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapControl = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapControl: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapControlButton instance.
 */
export const mockYMapControlButtonInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapControlButton class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapControlButtonConstructor = (
  instance: ReturnType<typeof mockYMapControlButtonInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapControlButton = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapControlButton: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapControlCommonButton instance.
 */
export const mockYMapControlCommonButtonInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapControlCommonButton class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapControlCommonButtonConstructor = (
  instance: ReturnType<typeof mockYMapControlCommonButtonInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapControlCommonButton = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapControlCommonButton: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapControls instance.
 */
export const mockYMapControlsInstance = () => ({
  update: jest.fn(),
  addChild: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapControls class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapControlsConstructor = (
  instance: ReturnType<typeof mockYMapControlsInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapControls = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapControls: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls@X.X.X').YMapGeolocationControl instance.
 */
export const mockYMapGeolocationControlInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls@X.X.X').YMapGeolocationControl class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapGeolocationControlConstructor = (
  instance: ReturnType<typeof mockYMapGeolocationControlInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapGeolocationControl', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls-extra').YMapOpenMapsButton instance.
 */
export const mockYMapOpenMapsButtonInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls-extra').YMapOpenMapsButton class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapOpenMapsButtonConstructor = (
  instance: ReturnType<typeof mockYMapOpenMapsButtonInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapOpenMapsButton', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapScaleControl instance.
 */
export const mockYMapScaleControlInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapScaleControl class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapScaleControlConstructor = (
  instance: ReturnType<typeof mockYMapScaleControlInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapScaleControl = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapScaleControl: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls@X.X.X').YMapZoomControl instance.
 */
export const mockYMapZoomControlInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-controls@X.X.X').YMapZoomControl class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapZoomControlConstructor = (
  instance: ReturnType<typeof mockYMapDefaultMarkerInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapZoomControl', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapGroupEntity instance.
 */
export const mockYMapGroupEntityInstance = () => ({
  _onAttach: jest.fn(),
  _onDetach: jest.fn(),
  _watchContext: jest.fn(),
  _consumeContext: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapGroupEntity class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapGroupEntityConstructor = (
  instance: ReturnType<typeof mockYMapGroupEntityInstance>,
): jest.Mock => {
  // This function is extended by another class, so it doesn't work as expected.
  // Fields cannot be overwritten when a function is extended, not a class.
  // But it's very complicated to test such code, so for now it is what it is.

  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapGroupEntity = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapGroupEntity: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.YMapFeatureDataSource instance.
 */
export const mockYMapFeatureDataSourceInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.YMapFeatureDataSource class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapFeatureDataSourceConstructor = (
  instance: ReturnType<typeof mockYMapFeatureDataSourceInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  const testingWindow: TestingWindow = window;

  if (testingWindow.ymaps3) {
    testingWindow.ymaps3.YMapFeatureDataSource = constructorMock;
  } else {
    testingWindow.ymaps3 = {
      YMapFeatureDataSource: constructorMock,
    };
  }

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-hint@X.X.X').YMapHint instance.
 */
export const mockYMapHintInstance = () => ({
  update: jest.fn(),
  addChild: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-hint@X.X.X').YMapHint class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapHintConstructor = (
  instance: ReturnType<typeof mockYMapHintInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapHint', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-hint@X.X.X').YMapHintContext instance.
 */
export const mockYMapHintContextInstance = () => ({});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-hint@X.X.X').YMapHintContext class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapHintContextConstructor = (
  instance: ReturnType<typeof mockYMapHintContextInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapHintContext', constructorMock);

  return constructorMock;
};

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-clusterer@X.X.X').YMapClusterer instance.
 */
export const mockYMapClustererInstance = () => ({
  update: jest.fn(),
});

/**
 * Mocks a ymaps3.import('@yandex/ymaps3-clusterer@X.X.X').YMapClusterer class.
 * @param instance instance that is returned from a constructor.
 */
export const mockYMapClustererConstructor = (
  instance: ReturnType<typeof mockYMapHintContextInstance>,
): jest.Mock => {
  const constructorMock = jest.fn(() => instance);

  mockImport('YMapClusterer', constructorMock);

  return constructorMock;
};

/**
 * Mocks ymaps3.import('@yandex/ymaps3-clusterer@X.X.X').clusterByGrid.
 */
export const mockClusterByGrid = (): jest.Mock => {
  const mock = jest.fn(() => []);

  mockImport('clusterByGrid', mock);

  return mock;
};
