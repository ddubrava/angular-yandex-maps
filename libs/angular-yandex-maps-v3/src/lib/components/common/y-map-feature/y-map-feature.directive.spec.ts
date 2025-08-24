import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapFeatureProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapFeatureConstructor,
  mockYMapFeatureInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapFeatureDirective } from './y-map-feature.directive';

@Component({
  standalone: true,
  imports: [YMapFeatureDirective],
  template: '<y-map-feature [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapFeatureDirective, { static: true })
  feature!: YMapFeatureDirective;

  props: YMapFeatureProps = {
    geometry: {
      type: 'Polygon',
      coordinates: [[[0, 0]]],
    },
  };
}

describe('YMapFeatureDirective', () => {
  let component: YMapFeatureDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let featureInstance: ReturnType<typeof mockYMapFeatureInstance>;
  let featureConstructorMock: jest.Mock;

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
    component = mockComponent.feature;

    featureInstance = mockYMapFeatureInstance();
    featureConstructorMock = mockYMapFeatureConstructor(featureInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(featureConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(featureInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: featureInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapFeatureProps = {
      geometry: {
        type: 'Point',
        coordinates: [50, 50],
      },
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(featureConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapFeatureProps = {
      geometry: {
        type: 'LineString',
        coordinates: [
          [0, 0],
          [10, 10],
        ],
      },
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(featureInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.removeChild).toHaveBeenCalledWith(featureInstance);
  });
});
