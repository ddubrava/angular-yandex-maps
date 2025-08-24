import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapFeatureDataSourceProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapFeatureDataSourceConstructor,
  mockYMapFeatureDataSourceInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapFeatureDataSourceDirective } from './y-map-feature-data-source.directive';

@Component({
  standalone: true,
  imports: [YMapFeatureDataSourceDirective],
  template: '<y-map-feature-data-source [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapFeatureDataSourceDirective, { static: true })
  feature!: YMapFeatureDataSourceDirective;

  props: YMapFeatureDataSourceProps = {
    id: 'a-source',
  };
}

describe('YMapFeatureDataSourceDirective', () => {
  let component: YMapFeatureDataSourceDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let sourceInstance: ReturnType<typeof mockYMapFeatureDataSourceInstance>;
  let sourceConstructorMock: jest.Mock;

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

    sourceInstance = mockYMapFeatureDataSourceInstance();
    sourceConstructorMock = mockYMapFeatureDataSourceConstructor(sourceInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(sourceConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(sourceInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: sourceInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapFeatureDataSourceProps = {
      id: 'b-source',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(sourceConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapFeatureDataSourceProps = {
      id: 'c-source',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(sourceInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.removeChild).toHaveBeenCalledWith(sourceInstance);
  });
});
