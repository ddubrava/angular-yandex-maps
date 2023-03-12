import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import {
  mockGeoObjectConstructor,
  mockGeoObjectInstance,
  mockMapInstance,
} from '../../../test-utils';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaGeoObjectDirective } from './ya-geoobject.directive';

@Component({
  template: `
    <ya-geoobject
      [feature]="feature"
      [options]="options"
      (yacontextmenu)="handleContextMenu()"
      (yadrag)="handleDrag()"
      (multitouchstart)="handleMultitouchStart()"
    ></ya-geoobject>
  `,
})
class MockHostComponent {
  @ViewChild(YaGeoObjectDirective, { static: true }) geoObject!: YaGeoObjectDirective;

  feature?: ymaps.IGeoObjectFeature;

  options?: ymaps.IGeoObjectOptions;

  handleContextMenu(): void {}

  handleDrag(): void {}

  handleMultitouchStart(): void {}
}

describe('YaGeoObjectDirective', () => {
  let component: YaGeoObjectDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let geoObjectInstance: ReturnType<typeof mockGeoObjectInstance>;
  let geoObjectConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaGeoObjectDirective],
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
    component = mockComponent.geoObject;

    geoObjectInstance = mockGeoObjectInstance();
    geoObjectConstructorMock = mockGeoObjectConstructor(geoObjectInstance);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create geoObject', () => {
    const feature = {
      geometry: {
        type: 'Rectangle',
        coordinates: [
          [55.665, 37.66],
          [55.64, 37.53],
        ],
      },
    };

    mockComponent.feature = feature;
    fixture.detectChanges();

    expect(geoObjectConstructorMock).toHaveBeenCalledWith(feature, undefined);
    expect(mapInstance.geoObjects.add).toHaveBeenCalledWith(geoObjectInstance);
  });

  it('should emit ready on geoObject load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: geoObjectInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set feature', () => {
    const feature = {
      geometry: {
        type: 'Rectangle',
        coordinates: [
          [55.665, 37.66],
          [55.64, 37.53],
        ],
      },
      properties: {
        balloonContent: 'content',
        balloonContentBody: 'body',
      },
    };

    mockComponent.feature = feature;
    fixture.detectChanges();

    expect(geoObjectConstructorMock.mock.calls[0][0]).toEqual(feature);
  });

  it('should set options', () => {
    const options = {
      circleOverlay: 'string',
      cursor: 'default',
      fill: false,
      fillOpacity: 0.5,
      iconLayout: 'layout',
      iconShadowImageHref: 'href',
      iconShadowLayout: 'layout',
      visible: false,
      zIndex: 10,
    };

    mockComponent.options = options;
    fixture.detectChanges();

    expect(geoObjectConstructorMock.mock.calls[0][1]).toEqual(options);
  });

  it('should set feature.properties after init', () => {
    fixture.detectChanges();

    const feature = {
      properties: {
        balloonContent: 'content',
        balloonContentBody: 'body',
      },
    };

    mockComponent.feature = feature;
    fixture.detectChanges();

    expect(geoObjectInstance.properties.set).toHaveBeenCalledWith(feature.properties);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      cursor: 'pointer',
      draggable: true,
      fill: true,
      fillColor: '#ffffff',
      openBalloonOnClick: false,
      outline: false,
      strokeColor: '#fff333',
    };

    mockComponent.options = options;
    fixture.detectChanges();

    expect(geoObjectInstance.options.set).toHaveBeenCalledWith(options);
  });

  it('should console warn if feature.geometry is passed after init', () => {
    fixture.detectChanges();

    const feature = {
      geometry: {
        type: 'Rectangle',
        coordinates: [
          [55.665, 37.66],
          [55.64, 37.53],
        ],
      },
    };

    console.warn = jest.fn();

    mockComponent.feature = feature;
    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalled();
  });

  it('should remove geoObject from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.geoObjects.remove).toHaveBeenCalledWith(geoObjectInstance);
  });

  it('should init event handlers that are set on the geoObject', () => {
    const addMock = geoObjectInstance.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('contextmenu', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('drag', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('multitouchstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonclose', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonopen', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('beforedrag', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('beforedragstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('click', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dblclick', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dragend', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('editorstatechange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('geometrychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('hintclose', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('hintopen', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mapchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseenter', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchend', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchmove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('optionschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('overlaychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('parentchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('propertieschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('wheel', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = geoObjectInstance.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('hintopen', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = mockComponent.geoObject.hintopen.subscribe();
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('hintopen', expect.any(Function));
    subscription.unsubscribe();
  });
});
