import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { YaClustererComponent } from './ya-clusterer.component';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';
import { YaMapComponent } from '../ya-map/ya-map.component';
import {
  createClustererConstructorSpy,
  createClustererSpy,
  createGeoObjectConstructorSpy,
  createGeoObjectSpy,
  createMapSpy,
  createPlacemarkConstructorSpy,
  createPlacemarkSpy,
} from '../../testing/fake-ymaps-utils';
import { YaReadyEvent } from '../../utils/event-manager';

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

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let clustererSpy: jasmine.SpyObj<ymaps.Clusterer>;
  let clustererConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent, YaClustererComponent],
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
    component = fixture.componentInstance.clusterer;

    const placemarkSpy = createPlacemarkSpy();
    createPlacemarkConstructorSpy(placemarkSpy);

    const geoObjectSpy = createGeoObjectSpy();
    createGeoObjectConstructorSpy(geoObjectSpy);

    clustererSpy = createClustererSpy();
    clustererConstructorSpy = createClustererConstructorSpy(clustererSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create clusterer', () => {
    fixture.detectChanges();
    expect(clustererConstructorSpy).toHaveBeenCalledWith(undefined);
    /**
     * Typings seems ok, bug in Yandex.Maps API documentation
     */
    expect(mapSpy.geoObjects.add as any).toHaveBeenCalledWith(clustererSpy);
  });

  it('should emit ready on clusterer load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: clustererSpy,
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

    expect(clustererConstructorSpy.calls.mostRecent()?.args[0]).toEqual(options);
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

    expect(clustererSpy.options.set).toHaveBeenCalledWith(options);
  });

  it('should set placemarks and geoObjects in the clusterer', () => {
    fixture.detectChanges();
    expect(clustererSpy.add).toHaveBeenCalledWith(jasmine.any(Object));
  });

  it('should set update placemarks and geoObjects in the clusterer', () => {
    fixture.detectChanges();
    expect(clustererSpy.add).toHaveBeenCalledWith(jasmine.any(Object));

    fixture.componentInstance.case = 'case2';
    fixture.detectChanges();

    expect(clustererSpy.remove).toHaveBeenCalledWith(jasmine.any(Object));
    expect(clustererSpy.add).toHaveBeenCalledWith(jasmine.any(Object));

    fixture.componentInstance.case = 'case0';
    fixture.detectChanges();

    expect(clustererSpy.remove).toHaveBeenCalledWith(jasmine.any(Object));
    expect(clustererSpy.add).toHaveBeenCalledWith([]);
  });

  it('should init event handlers that are set on the clusterer', () => {
    const addSpy = clustererSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('hintclose', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('optionschange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('hintopen', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('mapchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('parentchange', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = clustererSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('mapchange', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.clusterer.mapchange.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('mapchange', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
