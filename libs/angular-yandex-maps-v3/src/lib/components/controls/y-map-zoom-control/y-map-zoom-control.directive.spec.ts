import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultSchemeLayerProps,
  YMapListenerProps,
} from '@yandex/ymaps3-types';
import { GenericEntity } from '@yandex/ymaps3-types/imperative/Entities';
import { YMapControlCommonButtonProps } from '@yandex/ymaps3-types/imperative/YMapControl';
import { YMapZoomControlProps } from '@yandex/ymaps3-types/packages/controls';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlButtonConstructor,
  mockYMapControlButtonInstance,
  mockYMapControlCommonButtonConstructor,
  mockYMapControlCommonButtonInstance,
  mockYMapControlsInstance,
  mockYMapInstance,
  mockYMapListenerConstructor,
  mockYMapListenerInstance,
  mockYMapZoomControlConstructor,
  mockYMapZoomControlInstance,
} from '../../../../test-utils';
import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';
import { YMapZoomControlDirective } from './y-map-zoom-control.directive';

@Component({
  standalone: true,
  imports: [YMapZoomControlDirective],
  template: '<y-map-zoom-control-button [props]="props" [options]="options" />',
})
class MockHostComponent {
  @ViewChild(YMapZoomControlDirective, { static: true })
  control!: YMapZoomControlDirective;

  props: YMapZoomControlProps = {};

  options?: ComplexOptions<YMap>;
}

describe('YMapZoomControlDirective', () => {
  let component: YMapZoomControlDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlInstance: ReturnType<typeof mockYMapZoomControlInstance>;
  let controlConstructorMock: jest.Mock;

  beforeEach(async () => {
    controlsInstance = mockYMapControlsInstance();

    await TestBed.configureTestingModule({
      imports: [MockHostComponent],
      providers: [
        {
          provide: YMapControlsDirective,
          useValue: {
            controls$: new BehaviorSubject(controlsInstance),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.control;

    controlInstance = mockYMapZoomControlInstance();
    controlConstructorMock = mockYMapZoomControlConstructor(controlInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', async () => {
    fixture.detectChanges();

    expect((window as any).ymaps3.import).toHaveBeenCalledWith('@yandex/ymaps3-controls@0.0.1');

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(controlConstructorMock).toHaveBeenCalledWith(mockComponent.props, mockComponent.options);
    expect(controlsInstance.addChild).toHaveBeenCalledWith(controlInstance);
  });

  it('should emit ready on load', async () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: controlInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', async () => {
    const props: YMapZoomControlProps = {
      easing: 'ease-in-out',
      duration: 500,
    };

    const options: ComplexOptions<YMap> = {
      container: false,
    };

    mockComponent.props = props;
    mockComponent.options = options;

    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(controlConstructorMock).toHaveBeenCalledWith(props, options);
  });

  it('should update props input after init', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const props: YMapZoomControlProps = {
      easing: 'linear',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlInstance.update).toHaveBeenCalledWith(props);
  });
});
