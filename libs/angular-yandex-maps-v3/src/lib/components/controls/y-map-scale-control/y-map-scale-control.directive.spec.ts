import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapListenerProps, YMapScaleControl, YMapScaleControlProps } from '@yandex/ymaps3-types';
import { YMapControlCommonButtonProps } from '@yandex/ymaps3-types/imperative/YMapControl';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlButtonConstructor,
  mockYMapControlButtonInstance,
  mockYMapControlsInstance,
  mockYMapInstance,
  mockYMapListenerConstructor,
  mockYMapListenerInstance,
  mockYMapScaleControlConstructor,
  mockYMapScaleControlInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';
import { YMapScaleControlDirective } from './y-map-scale-control.directive';

@Component({
  standalone: true,
  imports: [YMapScaleControlDirective],
  template: '<y-map-scale-control [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapScaleControlDirective, { static: true })
  control!: YMapScaleControlDirective;

  props: YMapScaleControlProps = {};
}

describe('YMapScaleControlDirective', () => {
  let component: YMapScaleControlDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlInstance: ReturnType<typeof mockYMapControlButtonInstance>;
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

    controlInstance = mockYMapScaleControlInstance();
    controlConstructorMock = mockYMapScaleControlConstructor(controlInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(controlsInstance.addChild).toHaveBeenCalledWith(controlInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: controlInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapScaleControlProps = {
      maxWidth: 100,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapScaleControlProps = {
      unit: 'nautical',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlInstance.update).toHaveBeenCalledWith(props);
  });
});
