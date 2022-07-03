import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaObjectManagerDirective } from './ya-object-manager.directive';
import {
  createMapSpy,
  createObjectManagerConstructorSpy,
  createObjectManagerSpy,
} from '../../testing/fake-ymaps-utils';
import { YaReadyEvent } from '../../models/ya-ready-event';

@Component({
  template: `
    <ya-object-manager
      [options]="options"
      (yaclick)="handleClick()"
      (geometrychange)="handleGeometryChange()"
      (multitouchmove)="handleMultitouchMove()"
    ></ya-object-manager>
  `,
})
class MockHostComponent {
  @ViewChild(YaObjectManagerDirective, { static: true }) objectManager: YaObjectManagerDirective;

  options: ymaps.IObjectManagerOptions;

  handleClick(): void {}

  handleGeometryChange(): void {}

  handleMultitouchMove(): void {}
}

describe('YaObjectManagerDirective', () => {
  let component: YaObjectManagerDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let objectManagerSpy: jasmine.SpyObj<ymaps.ObjectManager>;
  let objectManagerConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaObjectManagerDirective],
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
    component = fixture.componentInstance.objectManager;
    objectManagerSpy = createObjectManagerSpy();
    objectManagerConstructorSpy = createObjectManagerConstructorSpy(objectManagerSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create objectManager', () => {
    const options = {
      clusterize: true,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: false,
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(objectManagerConstructorSpy).toHaveBeenCalledWith(options);
    expect(mapSpy.geoObjects.add).toHaveBeenCalledWith(objectManagerSpy);
  });

  it('should emit ready on objectManager load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: objectManagerSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set options', () => {
    const options = {
      clusterize: true,
      minClusterSize: 10,
      clusterDisableClickZoom: true,
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(objectManagerConstructorSpy.calls.mostRecent()?.args[0]).toEqual(options);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      clusterize: true,
      minClusterSize: 10,
      clusterDisableClickZoom: true,
    };

    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(objectManagerSpy.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove objectManager from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapSpy.geoObjects.remove).toHaveBeenCalledWith(objectManagerSpy);
  });

  it('should init event handlers that are set on the objectManager', () => {
    const addSpy = objectManagerSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('geometrychange', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('multitouchmove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('contextmenu', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('dblclick', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mapchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousedown', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseleave', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mousemove', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mouseup', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchend', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('multitouchstart', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('overlaychange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('parentchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('propertieschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('wheel', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = objectManagerSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('overlaychange', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.objectManager.overlaychange.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('overlaychange', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
