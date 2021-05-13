import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import * as GenerateRandomIdModule from '../../utils/generate-random-id';
import { YaMapComponent } from './ya-map.component';
import { YaReadyEvent } from '../../utils/event-manager';
import { YaApiLoaderService } from '../../services/ya-api-loader/ya-api-loader.service';

/** Creates a jasmine.SpyObj for a ymaps.Map. */
function createMapSpy(): jasmine.SpyObj<ymaps.Map> {
  return jasmine.createSpyObj('ymaps.Map', ['setCenter', 'setZoom', 'setBounds', 'setType'], {
    events: jasmine.createSpyObj('events', ['add']),
    behaviors: jasmine.createSpyObj('behaviors', ['enable']),
    margin: jasmine.createSpyObj('margin', ['setDefaultMargin']),
    controls: jasmine.createSpyObj('controls', ['add']),
    options: jasmine.createSpyObj('controls', ['set']),
  });
}

/** Creates a jasmine.Spy to watch for the constructor of a ymaps.Map. */
function createMapConstructorSpy(mapSpy: jasmine.SpyObj<ymaps.Map>): jasmine.Spy {
  const mapConstructorSpy = jasmine.createSpy('Map constructor').and.returnValue(mapSpy);

  window.ymaps = {
    Map: mapConstructorSpy,
  } as any;

  return mapConstructorSpy;
}

@Component({
  template: `
    <ya-map #map [center]="center" [zoom]="zoom" [state]="state" [options]="options">
      <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('map', { static: true }) map: YaMapComponent;

  center: number[];

  zoom: number;

  state: ymaps.IMapState;

  options: ymaps.IMapOptions;
}

describe('YaMapComponent', () => {
  let component: YaMapComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let mapConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    const yaApiLoaderServiceStub = {
      initScript: () => new Observable((s) => s.next()),
    };

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaMapComponent],
      providers: [{ provide: YaApiLoaderService, useValue: yaApiLoaderServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.map;
    mapSpy = createMapSpy();
    mapConstructorSpy = createMapConstructorSpy(mapSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create map', () => {
    const random = 'random_test_value';
    spyOn(GenerateRandomIdModule, 'generateRandomId').and.returnValue(random);

    fixture.detectChanges();

    expect(component.container.nativeElement.style.width).toBe('100%');
    expect(component.container.nativeElement.style.height).toBe('100%');
    expect(component.container.nativeElement.id).toBe(random);

    expect(mapConstructorSpy).toHaveBeenCalledWith(random, { zoom: 10, center: [] }, {});
  });

  it('should emit ready on map load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: mapSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should setup map listeners', () => {
    fixture.detectChanges();
    expect(mapSpy.events.add).toHaveBeenCalled();
  });

  it('should set default center and zoom if not passed', () => {
    fixture.detectChanges();
    expect(mapConstructorSpy.calls.mostRecent()?.args[1]).toEqual({
      center: [],
      zoom: 10,
    });
  });

  it('should set center and zoom', () => {
    const center = [50, 50];
    const zoom = 5;

    fixture.componentInstance.center = center;
    fixture.componentInstance.zoom = zoom;

    fixture.detectChanges();

    expect(mapConstructorSpy.calls.mostRecent()?.args[1]).toEqual({
      center,
      zoom,
    });
  });

  it('should not set a default zoom level if zoom is 0', () => {
    fixture.componentInstance.zoom = 0;
    fixture.detectChanges();

    expect(mapConstructorSpy.calls.mostRecent()?.args[1].zoom).toBe(0);
  });

  it('should set map state and options', () => {
    const state = {
      center: [50, 50],
      zoom: 5,
      controls: [],
    };

    const options = {
      restrictMapArea: [
        [50, 50],
        [60, 60],
      ],
    };

    fixture.componentInstance.state = state;
    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(mapConstructorSpy.calls.mostRecent()?.args[1]).toEqual(state);
    expect(mapConstructorSpy.calls.mostRecent()?.args[2]).toEqual(options);
  });

  it('should give precedence to center and zoom over state', () => {
    const state = {
      center: [50, 50],
      zoom: 5,
    };

    const correctState = {
      center: [40, 40],
      zoom: 8,
    };

    fixture.componentInstance.state = state;
    fixture.componentInstance.center = correctState.center;
    fixture.componentInstance.zoom = correctState.zoom;

    fixture.detectChanges();

    expect(mapConstructorSpy.calls.mostRecent()?.args[1]).toEqual(correctState);
  });

  it('should set center and zoom on change', () => {
    fixture.detectChanges();

    const state = {
      center: [40, 40],
      zoom: 8,
    };

    fixture.componentInstance.center = state.center;
    fixture.componentInstance.zoom = state.zoom;

    fixture.detectChanges();

    expect(mapSpy.setCenter).toHaveBeenCalledWith(state.center);
    expect(mapSpy.setZoom).toHaveBeenCalledWith(state.zoom);
  });

  it('should give precedence to center and zoom over state on change', () => {
    const correctState = {
      center: [40, 40],
      zoom: 8,
    };

    fixture.componentInstance.center = correctState.center;
    fixture.componentInstance.zoom = correctState.zoom;

    fixture.detectChanges();

    fixture.componentInstance.state = {
      center: [10, 10],
      zoom: 8,
    };

    fixture.detectChanges();

    expect(mapSpy.setCenter).toHaveBeenCalledWith(correctState.center);
    expect(mapSpy.setZoom).toHaveBeenCalledWith(correctState.zoom);
  });

  it('should set state on change', () => {
    fixture.detectChanges();

    const state = {
      behaviors: ['default'],
      bounds: [[0, 0]],
      center: [10, 10],
      controls: ['searchControl', 'trafficControl', 'zoomControl'] as ymaps.ControlKey[],
      margin: 50,
      type: 'yandex#satellite' as const,
      zoom: 8,
    };

    fixture.componentInstance.state = state;

    fixture.detectChanges();

    expect(mapSpy.behaviors.enable).toHaveBeenCalledWith(state.behaviors);
    expect(mapSpy.setBounds).toHaveBeenCalledWith(state.bounds);
    expect(mapSpy.setCenter).toHaveBeenCalledWith(state.center);
    expect(mapSpy.controls.add).toHaveBeenCalledTimes(state.controls.length);
    expect(mapSpy.controls.add).toHaveBeenCalledWith(state.controls[0]);
    expect(mapSpy.controls.add).toHaveBeenCalledWith(state.controls[1]);
    expect(mapSpy.controls.add).toHaveBeenCalledWith(state.controls[2]);
    expect(mapSpy.behaviors.enable).toHaveBeenCalledWith(state.behaviors);
    expect(mapSpy.setZoom).toHaveBeenCalledWith(state.zoom);
  });

  it('should set options on change', () => {
    fixture.detectChanges();

    const options: ymaps.IMapOptions = {
      mapAutoFocus: true,
      nativeFullscreen: false,
      suppressObsoleteBrowserNotifier: true,
    };

    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(mapSpy.options.set).toHaveBeenCalledWith(options);
  });
});
