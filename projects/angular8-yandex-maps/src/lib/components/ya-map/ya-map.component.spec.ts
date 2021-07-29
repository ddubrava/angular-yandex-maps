import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import * as GenerateRandomIdModule from '../../utils/generate-random-id';
import { YaMapComponent } from './ya-map.component';
import {
  createMapConstructorSpy,
  createMapSpy,
  createReadySpy,
} from '../../testing/fake-ymaps-utils';
import { YaReadyEvent } from '../../typings/ya-ready-event';

@Component({
  template: `
    <ya-map
      [center]="center"
      [zoom]="zoom"
      [state]="state"
      [options]="options"
      (yaclick)="handleClick()"
      (hintopen)="handleHintOpen()"
    ></ya-map>
  `,
})
class MockHostComponent {
  @ViewChild(YaMapComponent, { static: true }) map: YaMapComponent;

  center: number[];

  zoom: number;

  state: ymaps.IMapState;

  options: ymaps.IMapOptions;

  handleClick(): void {}

  handleHintOpen(): void {}
}

describe('YaMapComponent', () => {
  let component: YaMapComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let mapConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    createReadySpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaMapComponent],
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
    const random = 'random_test_id';
    spyOn(GenerateRandomIdModule, 'generateRandomId').and.returnValue(random);

    fixture.detectChanges();

    expect(component.container.nativeElement.style.width).toBe('100%');
    expect(component.container.nativeElement.style.height).toBe('100%');
    expect(component.container.nativeElement.id).toBe(random);

    expect(mapConstructorSpy).toHaveBeenCalledWith(random, { zoom: 10, center: [0, 0] }, {});
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

  it('should set default center and zoom if not passed', () => {
    fixture.detectChanges();
    expect(mapConstructorSpy.calls.mostRecent()?.args[1]).toEqual({
      center: [0, 0],
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

  it('should set center and zoom after init', () => {
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

  it('should give precedence to center and zoom over state after init', () => {
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

  it('should set state after init', () => {
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

  it('should set options after init', () => {
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

  it('should init event handlers that are set on the map', () => {
    const addSpy = mapSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('hintopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('actionbegin', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('actionbreak', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('actionend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('actiontick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('actiontickcomplete', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('boundschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('contextmenu', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dblclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('destroy', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('hintclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('marginchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousedown', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseleave', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousemove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseup', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchmove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('sizechange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('typechange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('wheel', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = mapSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('multitouchend', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.map.multitouchend.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('multitouchend', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
