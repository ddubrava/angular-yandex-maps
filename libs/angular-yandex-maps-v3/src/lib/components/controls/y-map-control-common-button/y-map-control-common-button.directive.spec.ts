import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMap } from '@yandex/ymaps3-types';
import { YMapControlCommonButtonProps } from '@yandex/ymaps3-types/imperative/YMapControl';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlCommonButtonConstructor,
  mockYMapControlCommonButtonInstance,
  mockYMapControlsInstance,
} from '../../../../test-utils';
import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';
import { YMapControlCommonButtonDirective } from './y-map-control-common-button.directive';

@Component({
  standalone: true,
  imports: [YMapControlCommonButtonDirective],
  template: '<y-map-control-common-button [props]="props" [options]="options" />',
})
class MockHostComponent {
  @ViewChild(YMapControlCommonButtonDirective, { static: true })
  control!: YMapControlCommonButtonDirective;

  props: YMapControlCommonButtonProps = {};

  options?: ComplexOptions<YMap>;
}

describe('YMapControlCommonButtonDirective', () => {
  let component: YMapControlCommonButtonDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlInstance: ReturnType<typeof mockYMapControlCommonButtonInstance>;
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

    controlInstance = mockYMapControlCommonButtonInstance();
    controlConstructorMock = mockYMapControlCommonButtonConstructor(controlInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(mockComponent.props, mockComponent.options);
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
    const props: YMapControlCommonButtonProps = {
      onClick: () => {},
    };

    const options: ComplexOptions<YMap> = {
      container: false,
    };

    mockComponent.props = props;
    mockComponent.options = options;

    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(props, options);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapControlCommonButtonProps = {
      background: 'yellow',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(controlsInstance.removeChild).toHaveBeenCalledWith(controlInstance);
  });
});
