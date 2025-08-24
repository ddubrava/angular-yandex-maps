import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapDefaultMarkerProps } from '@yandex/ymaps3-types/packages/markers';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapDefaultMarkerConstructor,
  mockYMapDefaultMarkerInstance,
  mockYMapInstance,
  mockYMapMarkerInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapDefaultMarkerDirective } from './y-map-default-marker.directive';

@Component({
  standalone: true,
  imports: [YMapDefaultMarkerDirective],
  template: '<y-map-default-marker [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapDefaultMarkerDirective, { static: true })
  marker!: YMapDefaultMarkerDirective;

  props: YMapDefaultMarkerProps = {
    coordinates: [0, 0],
  };
}

describe('YMapDefaultMarkerDirective', () => {
  let component: YMapDefaultMarkerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let markerInstance: ReturnType<typeof mockYMapMarkerInstance>;
  let markerConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockYMapInstance();

    await TestBed.configureTestingModule({
      imports: [MockHostComponent],
      providers: [
        {
          provide: YMapComponent,
          useValue: {
            map$: new BehaviorSubject(mapInstance),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.marker;

    markerInstance = mockYMapDefaultMarkerInstance();
    markerConstructorMock = mockYMapDefaultMarkerConstructor(markerInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', async () => {
    fixture.detectChanges();

    expect((window as any).ymaps3.import).toHaveBeenCalledWith('@yandex/ymaps3-markers@0.0.1');

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(markerConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(markerInstance);
  });

  it('should emit ready on load', async () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: markerInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', async () => {
    const props: YMapDefaultMarkerProps = {
      coordinates: [34, 54],
      title: 'Hello World!',
      subtitle: 'kind and bright',
      color: 'blue',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(markerConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const props: YMapDefaultMarkerProps = {
      coordinates: [0, 0],
      color: 'red',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(markerInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    fixture.destroy();

    expect(mapInstance.removeChild).toHaveBeenCalledWith(markerInstance);
  });
});
