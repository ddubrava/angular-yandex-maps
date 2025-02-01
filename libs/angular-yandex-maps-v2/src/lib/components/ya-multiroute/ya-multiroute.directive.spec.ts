import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { mockMapInstance, mockMultiroute, mockMultirouteConstructor } from '../../../test-utils';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaMultirouteDirective } from './ya-multiroute.directive';

@Component({
  template: `
    <ya-multiroute
      [referencePoints]="referencePoints"
      [model]="model"
      [options]="options"
      (mapchange)="handleMapChange()"
      (parentchange)="handleParentChange()"
      (pixelboundschange)="handlePixelBoundsChange()"
    ></ya-multiroute>
  `,
  standalone: false,
})
class MockHostComponent {
  @ViewChild(YaMultirouteDirective, { static: true }) multiroute!: YaMultirouteDirective;

  referencePoints?: ymaps.IMultiRouteReferencePoint[];

  model?: ymaps.multiRouter.MultiRouteModel | ymaps.IMultiRouteModelJson;

  options?: ymaps.multiRouter.IMultiRouteOptions;

  handleMapChange(): void {}

  handleParentChange(): void {}

  handlePixelBoundsChange(): void {}
}

describe('YaMultirouteDirective', () => {
  let component: YaMultirouteDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let multirouteInstance: ReturnType<typeof mockMultiroute>;
  let multirouteConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaMultirouteDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            isBrowser: true,
            map$: new BehaviorSubject(mapInstance),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.multiroute;

    multirouteInstance = mockMultiroute();
    multirouteConstructorMock = mockMultirouteConstructor(multirouteInstance);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create multiroute', () => {
    const referencePoints = [
      [0, 0],
      [1, 1],
    ];

    mockComponent.referencePoints = referencePoints;
    fixture.detectChanges();

    expect(multirouteConstructorMock).toHaveBeenCalledWith({ referencePoints }, undefined);
    expect(mapInstance.geoObjects.add).toHaveBeenCalledWith(multirouteInstance);
  });

  it('should emit ready on multiroute load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: multirouteInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set referencePoints', () => {
    const referencePoints = ['Moscow', 'Tver', 'Peterburg'];
    mockComponent.referencePoints = referencePoints;
    fixture.detectChanges();

    expect(multirouteConstructorMock.mock.calls[0][0]).toEqual({
      referencePoints,
    });
  });

  it('should set models', () => {
    const model = {
      referencePoints: [[55.751952, 37.600739], 'Красные ворота, Москва'],
      params: {
        avoidTrafficJams: true,
        strictBounds: true,
        results: 10,
      },
    };

    mockComponent.model = model;
    fixture.detectChanges();

    expect(multirouteConstructorMock.mock.calls[0][0]).toEqual(model);
  });

  it('should set options', () => {
    const options = {
      dragUpdateInterval: 10,
      zoomMargin: 5,
      activeRouteAutoSelection: false,
    };

    mockComponent.options = options;
    fixture.detectChanges();

    expect(multirouteConstructorMock.mock.calls[0][1]).toEqual(options);
  });

  it('should give precedence to referencePoints over models', () => {
    const referencePoints = ['Moscow', 'Saint-Petersburg'];

    const model = {
      referencePoints: ['Tver', 'Omsk'],
    };

    mockComponent.referencePoints = referencePoints;
    mockComponent.model = model;

    fixture.detectChanges();

    expect(multirouteConstructorMock.mock.calls[0][0]).toEqual({ referencePoints });
  });

  it('should set referencePoints after init', () => {
    fixture.detectChanges();

    const referencePoints = ['Moscow', 'Tver', 'Peterburg'];
    mockComponent.referencePoints = referencePoints;

    fixture.detectChanges();

    expect(multirouteInstance.model.setReferencePoints).toHaveBeenCalledWith(referencePoints);
  });

  it('should set models after init', () => {
    fixture.detectChanges();

    const model = {
      referencePoints: [[55.751952, 37.600739], 'Красные ворота, Москва'],
      params: {
        avoidTrafficJams: true,
        strictBounds: true,
        results: 10,
      },
    };

    mockComponent.model = model;

    fixture.detectChanges();

    expect(multirouteInstance.model.setReferencePoints).toHaveBeenCalledWith(model.referencePoints);
    expect(multirouteInstance.model.setParams).toHaveBeenCalledWith(model.params);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      routeMarker: {},
      routeWalkMarker: {},
      boundsAutoApply: true,
      useMapMargin: false,
    };

    mockComponent.options = options;

    fixture.detectChanges();

    expect(multirouteInstance.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove multiroute from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.geoObjects.remove).toHaveBeenCalledWith(multirouteInstance);
  });

  it('should init event handlers that are set on the multiroute', () => {
    const addMock = multirouteInstance.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('mapchange', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('parentchange', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('pixelboundschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('activeroutechange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonclose', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonopen', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('boundsautoapply', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('boundschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('click', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('contextmenu', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dblclick', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('geometrychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseenter', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchend', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchmove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('optionschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('overlaychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('propertieschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('update', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('wheel', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = multirouteInstance.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('balloonopen', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = mockComponent.multiroute.balloonopen.subscribe();
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('balloonopen', expect.any(Function));
    subscription.unsubscribe();
  });
});
