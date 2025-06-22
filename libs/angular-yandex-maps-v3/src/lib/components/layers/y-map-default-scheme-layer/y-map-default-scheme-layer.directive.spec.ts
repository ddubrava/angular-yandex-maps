import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMap, YMapDefaultSchemeLayerProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapDefaultSchemeLayerConstructor,
  mockYMapDefaultSchemeLayerInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapDefaultSchemeLayerDirective } from './y-map-default-scheme-layer.directive';

@Component({
  standalone: true,
  imports: [YMapDefaultSchemeLayerDirective],
  template: '<y-map-default-scheme-layer [props]="props" [options]="options" />',
})
class MockHostComponent {
  @ViewChild(YMapDefaultSchemeLayerDirective, { static: true })
  layer!: YMapDefaultSchemeLayerDirective;

  props: YMapDefaultSchemeLayerProps = {};

  options?: ComplexOptions<YMap>;
}

describe('YMapDefaultSchemeLayerDirective', () => {
  let component: YMapDefaultSchemeLayerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let layerInstance: ReturnType<typeof mockYMapDefaultSchemeLayerInstance>;
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

    layerInstance = mockYMapDefaultSchemeLayerInstance();
    layerConstructorMock = mockYMapDefaultSchemeLayerConstructor(layerInstance);
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
    const props: YMapDefaultSchemeLayerProps = {
      layers: {
        ground: {
          zIndex: 10,
        },
      },
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

    const props: YMapDefaultSchemeLayerProps = {
      source: 'f2139123',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(layerInstance.update).toHaveBeenCalledWith(props);
  });
});
