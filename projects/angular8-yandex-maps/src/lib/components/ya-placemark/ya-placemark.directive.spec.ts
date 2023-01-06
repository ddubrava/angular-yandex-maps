import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import {
  createMapSpy,
  createPlacemarkConstructorSpy,
  createPlacemarkSpy,
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

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let placemarkSpy: jasmine.SpyObj<ymaps.Placemark>;
  let placemarkConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaPlacemarkDirective],
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
    component = fixture.componentInstance.placemark;
    placemarkSpy = createPlacemarkSpy();
    placemarkConstructorSpy = createPlacemarkConstructorSpy(placemarkSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create placemark', () => {
    fixture.detectChanges();
    expect(placemarkConstructorSpy).toHaveBeenCalledWith([0, 0], undefined, undefined);
    expect(mapSpy.geoObjects.add).toHaveBeenCalledWith(placemarkSpy);
  });

  it('should emit ready on placemark load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: placemarkSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set geometry', () => {
    const geometry = [50, 50];

    fixture.componentInstance.geometry = geometry;
    fixture.detectChanges();

    expect(placemarkConstructorSpy.calls.mostRecent()?.args[0]).toEqual(geometry);
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

    expect(placemarkConstructorSpy.calls.mostRecent()?.args[1]).toEqual(properties);
    expect(placemarkConstructorSpy.calls.mostRecent()?.args[2]).toEqual(options);
  });

  it('should set geometry after init', () => {
    fixture.detectChanges();

    const geometry = [50, 50];

    fixture.componentInstance.geometry = geometry;
    fixture.detectChanges();

    expect(placemarkSpy.geometry!.setCoordinates).toHaveBeenCalledWith(geometry);
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

    expect(placemarkSpy.properties.set).toHaveBeenCalledWith(properties);
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

    expect(placemarkSpy.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove placemark from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapSpy.geoObjects.remove).toHaveBeenCalledWith(placemarkSpy);
  });

  it('should init event handlers that are set on the placemark', () => {
    const addSpy = placemarkSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('drag', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('parentchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonclose', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('balloonopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('beforedrag', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('beforedragstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('contextmenu', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dblclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dragend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dragstart', jasmine.any(Function));
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
    expect(addSpy).not.toHaveBeenCalledWith('multitouchstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('overlaychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('propertieschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('wheel', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = placemarkSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('editorstatechange', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.placemark.editorstatechange.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('editorstatechange', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
