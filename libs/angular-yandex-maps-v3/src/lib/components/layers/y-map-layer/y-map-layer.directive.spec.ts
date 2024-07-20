import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapLayerProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapInstance,
  mockYMapLayerConstructor,
  mockYMapLayerInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapLayerDirective } from './y-map-layer.directive';

@Component({
  standalone: true,
  imports: [YMapLayerDirective],
  template: '<y-map-layer [props]="props"  />',
})
class MockHostComponent {
  @ViewChild(YMapLayerDirective, { static: true })
  layer!: YMapLayerDirective;

  props: YMapLayerProps = {
    type: 'markers',
  };
}

describe('YMapLayerDirective', () => {
  let component: YMapLayerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let layerInstance: ReturnType<typeof mockYMapLayerInstance>;
  let layerConstructorMock: jest.Mock;

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
    component = mockComponent.layer;

    layerInstance = mockYMapLayerInstance();
    layerConstructorMock = mockYMapLayerConstructor(layerInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(layerConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(layerInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: layerInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapLayerProps = {
      type: 'ground',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(layerConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapLayerProps = {
      type: 'features',
      zIndex: 10,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(layerInstance.update).toHaveBeenCalledWith(props);
  });
});
