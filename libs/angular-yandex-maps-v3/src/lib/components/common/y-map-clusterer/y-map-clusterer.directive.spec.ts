import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapClustererProps } from '@yandex/ymaps3-types/packages/clusterer';
import { BehaviorSubject } from 'rxjs';

import {
  mockClusterByGrid,
  mockYMapClustererConstructor,
  mockYMapClustererInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { Optional } from '../../../types/utilities/optional';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapClustererDirective } from './y-map-clusterer.directive';

type OptionalYMapClustererProps = Optional<YMapClustererProps, 'marker' | 'cluster' | 'method'>;

@Component({
  standalone: true,
  imports: [YMapClustererDirective],
  template: `
    <y-map-clusterer [props]="props">
      <ng-template #marker />
      <ng-template #cluster />
    </y-map-clusterer>
  `,
})
class MockHostComponent {
  @ViewChild(YMapClustererDirective, { static: true })
  clusterer!: YMapClustererDirective;

  props: OptionalYMapClustererProps = {
    features: [
      {
        type: 'Feature',
        id: '0',
        geometry: {
          type: 'Point',
          coordinates: [0, 1],
        },
      },
    ],
  };
}

describe('YMapClustererDirective', () => {
  let component: YMapClustererDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let clustererInstance: ReturnType<typeof mockYMapClustererInstance>;
  let clustererConstructorMock: jest.Mock;

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
    component = mockComponent.clusterer;

    // Two instances are returned from the import function.
    clustererInstance = mockYMapClustererInstance();
    clustererConstructorMock = mockYMapClustererConstructor(clustererInstance);
    mockClusterByGrid();
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', async () => {
    fixture.detectChanges();

    expect((window as any).ymaps3.import).toHaveBeenCalledWith('@yandex/ymaps3-clusterer@0.0.1');

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(clustererConstructorMock).toHaveBeenCalledWith({
      marker: expect.any(Function),
      cluster: expect.any(Function),
      method: [],
      ...mockComponent.props,
    });

    expect(mapInstance.addChild).toHaveBeenCalledWith(clustererInstance);
  });

  it('should emit ready on load', async () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: clustererInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', async () => {
    const props: OptionalYMapClustererProps = {
      features: [],
      method: { render: () => [] },
    };

    mockComponent.props = props;

    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(clustererConstructorMock).toHaveBeenCalledWith(expect.objectContaining(props));
  });

  it('should update props input after init', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const props: OptionalYMapClustererProps = {
      features: [
        {
          type: 'Feature',
          id: '10',
          geometry: {
            type: 'Point',
            coordinates: [50, 50],
          },
        },
      ],
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(clustererInstance.update).toHaveBeenCalledWith(expect.objectContaining(props));
  });
});
