import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultFeaturesLayerProps,
} from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapDefaultFeaturesLayerConstructor,
  mockYMapDefaultFeaturesLayerInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapDefaultFeaturesLayerDirective } from './y-map-default-features-layer.directive';

@Component({
  standalone: true,
  imports: [YMapDefaultFeaturesLayerDirective],
  template: '<y-map-default-features-layer [props]="props" [options]="options" />',
})
class MockHostComponent {
  @ViewChild(YMapDefaultFeaturesLayerDirective, { static: true })
  layer!: YMapDefaultFeaturesLayerDirective;

  props: YMapDefaultFeaturesLayerProps = {};

  options?: ComplexOptions<YMap>;
}

describe('YMapDefaultFeaturesLayerDirective', () => {
  let component: YMapDefaultFeaturesLayerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let layerInstance: ReturnType<typeof mockYMapDefaultFeaturesLayerInstance>;
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

    layerInstance = mockYMapDefaultFeaturesLayerInstance();
    layerConstructorMock = mockYMapDefaultFeaturesLayerConstructor(layerInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(layerConstructorMock).toHaveBeenCalledWith(mockComponent.props, mockComponent.options);
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
    const props: YMapDefaultFeaturesLayerProps = {
      visible: false,
    };

    const options: ComplexOptions<YMap> = {
      container: false,
    };

    mockComponent.props = props;
    mockComponent.options = options;

    fixture.detectChanges();

    expect(layerConstructorMock).toHaveBeenCalledWith(props, options);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapDefaultFeaturesLayerProps = {
      zIndex: 10,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(layerInstance.update).toHaveBeenCalledWith(props);
  });
});
