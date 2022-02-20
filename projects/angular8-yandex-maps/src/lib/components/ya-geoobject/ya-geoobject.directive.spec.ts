import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { YaGeoObjectDirective } from './ya-geoobject.directive';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaReadyEvent } from '../../typings/ya-ready-event';
import {
  createGeoObjectConstructorSpy,
  createGeoObjectSpy,
  createMapSpy,
} from '../../testing/fake-ymaps-utils';

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
  @ViewChild(YaGeoObjectDirective, { static: true }) geoObject: YaGeoObjectDirective;

  feature: ymaps.IGeoObjectFeature;

  options: ymaps.IGeoObjectOptions;

  handleContextMenu(): void {}

  handleDrag(): void {}

  handleMultitouchStart(): void {}
}

describe('Directive: YaGeoObject', () => {
  let component: YaGeoObjectDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let geoObjectSpy: jasmine.SpyObj<ymaps.GeoObject>;
  let geoObjectConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaGeoObjectDirective],
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
    component = fixture.componentInstance.geoObject;
    geoObjectSpy = createGeoObjectSpy();
    geoObjectConstructorSpy = createGeoObjectConstructorSpy(geoObjectSpy);
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

    fixture.componentInstance.feature = feature;
    fixture.detectChanges();

    expect(geoObjectConstructorSpy).toHaveBeenCalledWith(feature, undefined);
    expect(mapSpy.geoObjects.add).toHaveBeenCalledWith(geoObjectSpy);
  });

  it('should emit ready on geoObject load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: geoObjectSpy,
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

    fixture.componentInstance.feature = feature;
    fixture.detectChanges();

    expect(geoObjectConstructorSpy.calls.mostRecent()?.args[0]).toEqual(feature);
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

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(geoObjectConstructorSpy.calls.mostRecent()?.args[1]).toEqual(options);
  });

  it('should set feature.properties after init', () => {
    fixture.detectChanges();

    const feature = {
      properties: {
        balloonContent: 'content',
        balloonContentBody: 'body',
      },
    };

    fixture.componentInstance.feature = feature;
    fixture.detectChanges();

    expect(geoObjectSpy.properties.set).toHaveBeenCalledWith(feature.properties);
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

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(geoObjectSpy.options.set).toHaveBeenCalledWith(options);
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

    console.warn = jasmine.createSpy('warn');

    fixture.componentInstance.feature = feature;
    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalled();
  });

  it('should remove geoObject from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapSpy.geoObjects.remove).toHaveBeenCalledWith(geoObjectSpy);
  });

  it('should init event handlers that are set on the geoObject', () => {
    const addSpy = geoObjectSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('contextmenu', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('drag', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('multitouchstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('beforedrag', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('beforedragstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dblclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dragend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('editorstatechange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('geometrychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('hintclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('hintopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mapchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousedown', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseleave', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousemove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseup', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchmove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('overlaychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('parentchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('propertieschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('wheel', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = geoObjectSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('hintopen', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.geoObject.hintopen.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('hintopen', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
