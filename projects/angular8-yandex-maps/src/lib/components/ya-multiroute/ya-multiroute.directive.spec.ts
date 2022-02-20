import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaMultirouteDirective } from './ya-multiroute.directive';
import { YaReadyEvent } from '../../typings/ya-ready-event';
import {
  createMapSpy,
  createMultirouteConstructorSpy,
  createMultirouteSpy,
} from '../../testing/fake-ymaps-utils';

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
})
class MockHostComponent {
  @ViewChild(YaMultirouteDirective, { static: true }) multiroute: YaMultirouteDirective;

  referencePoints: ymaps.IMultiRouteReferencePoint[];

  model: ymaps.multiRouter.MultiRouteModel | ymaps.IMultiRouteModelJson;

  options: ymaps.multiRouter.IMultiRouteOptions;

  handleMapChange(): void {}

  handleParentChange(): void {}

  handlePixelBoundsChange(): void {}
}

describe('Directive: YaMultiroute', () => {
  let component: YaMultirouteDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let multirouteSpy: jasmine.SpyObj<ymaps.multiRouter.MultiRoute>;
  let multirouteConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaMultirouteDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            isBrowser: true,
            map$: new BehaviorSubject(mapSpy),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.multiroute;
    multirouteSpy = createMultirouteSpy();
    multirouteConstructorSpy = createMultirouteConstructorSpy(multirouteSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create multiroute', () => {
    const referencePoints = [
      [0, 0],
      [1, 1],
    ];

    fixture.componentInstance.referencePoints = referencePoints;
    fixture.detectChanges();

    expect(multirouteConstructorSpy).toHaveBeenCalledWith({ referencePoints }, undefined);
    expect(mapSpy.geoObjects.add).toHaveBeenCalledWith(multirouteSpy);
  });

  it('should emit ready on multiroute load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: multirouteSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set referencePoints', () => {
    const referencePoints = ['Moscow', 'Tver', 'Peterburg'];
    fixture.componentInstance.referencePoints = referencePoints;
    fixture.detectChanges();

    expect(multirouteConstructorSpy.calls.mostRecent()?.args[0]).toEqual({
      referencePoints,
    });
  });

  it('should set model', () => {
    const model = {
      referencePoints: [[55.751952, 37.600739], 'Красные ворота, Москва'],
      params: {
        avoidTrafficJams: true,
        strictBounds: true,
        results: 10,
      },
    };

    fixture.componentInstance.model = model;
    fixture.detectChanges();

    expect(multirouteConstructorSpy.calls.mostRecent()?.args[0]).toEqual(model);
  });

  it('should set options', () => {
    const options = {
      dragUpdateInterval: 10,
      zoomMargin: 5,
      activeRouteAutoSelection: false,
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(multirouteConstructorSpy.calls.mostRecent()?.args[1]).toEqual(options);
  });

  it('should give precedence to referencePoints over model', () => {
    const referencePoints = ['Moscow', 'Saint-Petersburg'];

    const model = {
      referencePoints: ['Tver', 'Omsk'],
    };

    fixture.componentInstance.referencePoints = referencePoints;
    fixture.componentInstance.model = model;

    fixture.detectChanges();

    expect(multirouteConstructorSpy.calls.mostRecent()?.args[0]).toEqual({ referencePoints });
  });

  it('should set referencePoints after init', () => {
    fixture.detectChanges();

    const referencePoints = ['Moscow', 'Tver', 'Peterburg'];
    fixture.componentInstance.referencePoints = referencePoints;

    fixture.detectChanges();

    expect(multirouteSpy.model.setReferencePoints).toHaveBeenCalledWith(referencePoints);
  });

  it('should set model after init', () => {
    fixture.detectChanges();

    const model = {
      referencePoints: [[55.751952, 37.600739], 'Красные ворота, Москва'],
      params: {
        avoidTrafficJams: true,
        strictBounds: true,
        results: 10,
      },
    };

    fixture.componentInstance.model = model;

    fixture.detectChanges();

    expect(multirouteSpy.model.setReferencePoints).toHaveBeenCalledWith(model.referencePoints);
    expect(multirouteSpy.model.setParams).toHaveBeenCalledWith(model.params);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      routeMarker: {},
      routeWalkMarker: {},
      boundsAutoApply: true,
      useMapMargin: false,
    };

    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(multirouteSpy.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove multiroute from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapSpy.geoObjects.remove).toHaveBeenCalledWith(multirouteSpy);
  });

  it('should init event handlers that are set on the multiroute', () => {
    const addSpy = multirouteSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('mapchange', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('parentchange', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('pixelboundschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('activeroutechange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('boundsautoapply', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('boundschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yaclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yacontextmenu', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yadblclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('geometrychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yamousedown', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yamouseenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yamouseleave', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yamousemove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('yamouseup', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchmove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('overlaychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('propertieschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('update', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('wheel', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = multirouteSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('balloonopen', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.multiroute.balloonopen.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('balloonopen', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
