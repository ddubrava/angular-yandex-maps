import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import {
  mockMapInstance,
  mockPlacemarkConstructor,
  mockPlacemarkInstance,
} from '../../testing/fake-ymaps-utils';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaPlacemarkDirective } from './ya-placemark.directive';

@Component({
  template: `
    <ya-placemark
      [geometry]="geometry"
      [properties]="properties"
      [options]="options"
      (yaclick)="handleClick()"
      (yadrag)="handleDrag()"
      (parentchange)="handleParentChange()"
    ></ya-placemark>
  `,
})
class MockHostComponent {
  @ViewChild(YaPlacemarkDirective, { static: true }) placemark: YaPlacemarkDirective;

  geometry: number[] | object | ymaps.IPointGeometry = [0, 0];

  properties: object | ymaps.IDataManager;

  options: ymaps.IPlacemarkOptions;

  handleClick(): void {}

  handleDrag(): void {}

  handleParentChange(): void {}
}

describe('YaPlacemarkDirective', () => {
  let component: YaPlacemarkDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let placemarkInstance: ReturnType<typeof mockPlacemarkInstance>;
  let placemarkConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaPlacemarkDirective],
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
    component = fixture.componentInstance.placemark;

    placemarkInstance = mockPlacemarkInstance();
    placemarkConstructorMock = mockPlacemarkConstructor(placemarkInstance);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create placemark', () => {
    fixture.detectChanges();
    expect(placemarkConstructorMock).toHaveBeenCalledWith([0, 0], undefined, undefined);
    expect(mapInstance.geoObjects.add).toHaveBeenCalledWith(placemarkInstance);
  });

  it('should emit ready on placemark load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: placemarkInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set geometry', () => {
    const geometry = [50, 50];

    fixture.componentInstance.geometry = geometry;
    fixture.detectChanges();

    expect(placemarkConstructorMock.mock.calls[0][0]).toEqual(geometry);
  });

  it('should set placemark properties and options', () => {
    const properties = {
      iconContent: 'content',
      iconCaption: 'caption',
      balloonContent: 'content',
      balloonContentBody: 'body',
    };

    const options = {
      hasBalloon: true,
      draggable: true,
      zIndex: 10,
      page: 'key',
    };

    fixture.componentInstance.properties = properties;
    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(placemarkConstructorMock.mock.calls[0][1]).toEqual(properties);
    expect(placemarkConstructorMock.mock.calls[0][2]).toEqual(options);
  });

  it('should set geometry after init', () => {
    fixture.detectChanges();

    const geometry = [50, 50];

    fixture.componentInstance.geometry = geometry;
    fixture.detectChanges();

    expect(placemarkInstance.geometry!.setCoordinates).toHaveBeenCalledWith(geometry);
  });

  it('should set properties after init', () => {
    fixture.detectChanges();

    const properties = {
      iconContent: 'content',
      iconCaption: 'caption',
      balloonContent: 'content',
      balloonContentBody: 'body',
    };

    fixture.componentInstance.properties = properties;
    fixture.detectChanges();

    expect(placemarkInstance.properties.set).toHaveBeenCalledWith(properties);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      hasBalloon: true,
      draggable: true,
      zIndex: 10,
      page: 'key',
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(placemarkInstance.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove placemark from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.geoObjects.remove).toHaveBeenCalledWith(placemarkInstance);
  });

  it('should init event handlers that are set on the placemark', () => {
    const addMock = placemarkInstance.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('drag', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('parentchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonclose', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('balloonopen', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('beforedrag', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('beforedragstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('contextmenu', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dblclick', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dragend', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dragstart', expect.any(Function));
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
    expect(addMock).not.toHaveBeenCalledWith('multitouchstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('optionschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('overlaychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('propertieschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('wheel', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = placemarkInstance.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('editorstatechange', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.placemark.editorstatechange.subscribe();
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('editorstatechange', expect.any(Function));
    subscription.unsubscribe();
  });
});
