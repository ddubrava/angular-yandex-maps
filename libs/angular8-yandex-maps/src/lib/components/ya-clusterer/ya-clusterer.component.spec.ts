import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import {
  mockClustererConstructor,
  mockClustererInstance,
  mockGeoObjectConstructor,
  mockGeoObjectInstance,
  mockMapInstance,
  mockPlacemarkConstructor,
  mockPlacemarkInstance,
} from '../../testing/fake-ymaps-utils';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaClustererComponent } from './ya-clusterer.component';

@Component({
  template: `
    <ya-clusterer
      [options]="options"
      (hintclose)="handleHintClose()"
      (optionschange)="handleOptionsChange()"
    >
      <ng-container *ngIf="case === 'case1'">
        <ya-placemark></ya-placemark>
        <ya-placemark></ya-placemark>
        <ya-geoobject></ya-geoobject>
        <ya-geoobject></ya-geoobject>
      </ng-container>

      <ng-container *ngIf="case === 'case2'">
        <ya-placemark></ya-placemark>
        <ya-placemark></ya-placemark>
        <ya-placemark></ya-placemark>
        <ya-geoobject></ya-geoobject>
      </ng-container>
    </ya-clusterer>
  `,
})
class MockHostComponent {
  @ViewChild(YaClustererComponent, { static: true }) clusterer: YaClustererComponent;

  options: ymaps.IClustererOptions;

  case = 'case1';

  handleHintClose(): void {}

  handleOptionsChange(): void {}
}

describe('YaClustererComponent', () => {
  let component: YaClustererComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let clustererInstance: ReturnType<typeof mockClustererInstance>;
  let clustererConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent, YaClustererComponent],
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
    component = fixture.componentInstance.clusterer;

    const placemarkInstance = mockPlacemarkInstance();
    mockPlacemarkConstructor(placemarkInstance);

    const geoObjectInstance = mockGeoObjectInstance();
    mockGeoObjectConstructor(geoObjectInstance);

    clustererInstance = mockClustererInstance();
    clustererConstructorMock = mockClustererConstructor(clustererInstance);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create clusterer', () => {
    fixture.detectChanges();
    expect(clustererConstructorMock).toHaveBeenCalledWith(undefined);
    expect(mapInstance.geoObjects.add).toHaveBeenCalledWith(clustererInstance);
  });

  it('should emit ready on clusterer load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: clustererInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set options', () => {
    const options = {
      gridSize: 32,
      hasBalloon: false,
      margin: 5,
      maxZoom: 10,
      zoomMargin: 1,
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(clustererConstructorMock.mock.calls[0][0]).toEqual(options);
  });

  it('should set options after init', () => {
    fixture.detectChanges();

    const options = {
      groupByCoordinates: true,
      hasBalloon: true,
      useMapMargin: false,
    };

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(clustererInstance.options.set).toHaveBeenCalledWith(options);
  });

  it('should set placemarks and geoObjects in the clusterer', () => {
    fixture.detectChanges();
    expect(clustererInstance.add).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should set update placemarks and geoObjects in the clusterer', () => {
    fixture.detectChanges();
    expect(clustererInstance.add).toHaveBeenCalledWith(expect.any(Object));

    fixture.componentInstance.case = 'case2';
    fixture.detectChanges();

    expect(clustererInstance.remove).toHaveBeenCalledWith(expect.any(Object));
    expect(clustererInstance.add).toHaveBeenCalledWith(expect.any(Object));

    fixture.componentInstance.case = 'case0';
    fixture.detectChanges();

    expect(clustererInstance.remove).toHaveBeenCalledWith(expect.any(Object));
    expect(clustererInstance.add).toHaveBeenCalledWith([]);
  });

  it('should init event handlers that are set on the clusterer', () => {
    const addMock = clustererInstance.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('hintclose', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('optionschange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('hintopen', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('mapchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('parentchange', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = clustererInstance.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('mapchange', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.clusterer.mapchange.subscribe();

    expect(addMock).toHaveBeenCalledWith('mapchange', expect.any(Function));
    subscription.unsubscribe();
  });
});
