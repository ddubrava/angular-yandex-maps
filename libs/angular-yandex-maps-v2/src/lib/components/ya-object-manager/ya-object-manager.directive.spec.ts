import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { mockManagerConstructor, mockMapInstance, mockObjectManager } from '../../../test-utils';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaObjectManagerDirective } from './ya-object-manager.directive';

@Component({
  template: `
    <ya-object-manager
      [options]="options"
      (yaclick)="handleClick()"
      (geometrychange)="handleGeometryChange()"
      (multitouchmove)="handleMultitouchMove()"
    ></ya-object-manager>
  `,
  standalone: false,
})
class MockHostComponent {
  @ViewChild(YaObjectManagerDirective, { static: true }) objectManager!: YaObjectManagerDirective;

  options?: ymaps.IObjectManagerOptions = { clusterize: true };

  handleClick(): void {}

  handleGeometryChange(): void {}

  handleMultitouchMove(): void {}
}

describe('YaObjectManagerDirective', () => {
  let component: YaObjectManagerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let objectManagerInstance: ReturnType<typeof mockObjectManager>;
  let objectManagerConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaObjectManagerDirective],
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
    component = mockComponent.objectManager;

    objectManagerInstance = mockObjectManager();
    objectManagerConstructorMock = mockManagerConstructor(objectManagerInstance);
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

    mockComponent.options = options;
    fixture.detectChanges();

    expect(objectManagerConstructorMock).toHaveBeenCalledWith(options);
    expect(mapInstance.geoObjects.add).toHaveBeenCalledWith(objectManagerInstance);
  });

  it('should emit ready on objectManager load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: objectManagerInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set options', () => {
    const options = {
      clusterize: true,
      minClusterSize: 10,
      clusterDisableClickZoom: true,
    };

    mockComponent.options = options;
    fixture.detectChanges();

    expect(objectManagerConstructorMock.mock.calls[0][0]).toEqual(options);
  });

  it('should not call constructor if options are undefined', () => {
    mockComponent.options = undefined;
    fixture.detectChanges();
    expect(objectManagerConstructorMock).not.toBeCalled();
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      clusterize: true,
      minClusterSize: 10,
      clusterDisableClickZoom: true,
    };

    mockComponent.options = options;

    fixture.detectChanges();

    expect(objectManagerInstance.options.set).toHaveBeenCalledWith(options);
  });

  it('should remove objectManager from map.geoObjects on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.geoObjects.remove).toHaveBeenCalledWith(objectManagerInstance);
  });

  it('should init event handlers that are set on the objectManager', () => {
    const addMock = objectManagerInstance.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('geometrychange', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('multitouchmove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('contextmenu', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('dblclick', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mapchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseenter', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchend', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('multitouchstart', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('optionschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('overlaychange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('parentchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('propertieschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('wheel', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = objectManagerInstance.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('overlaychange', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = mockComponent.objectManager.overlaychange.subscribe();
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('overlaychange', expect.any(Function));
    subscription.unsubscribe();
  });
});
