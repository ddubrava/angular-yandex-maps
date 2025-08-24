import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapControlProps } from '@yandex/ymaps3-types/imperative/YMapControl';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlConstructor,
  mockYMapControlInstance,
  mockYMapControlsInstance,
  mockYMapGroupEntityConstructor,
  mockYMapGroupEntityInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';
import { YMapControlDirective } from './y-map-control.directive';

@Component({
  standalone: true,
  imports: [YMapControlDirective],
  template: '<y-map-control [props]="props"><div #element></div></y-map-control>',
})
class MockHostComponent {
  @ViewChild(YMapControlDirective, { static: true })
  control!: YMapControlDirective;

  @ViewChild('element', { static: true })
  element!: ElementRef<HTMLElement>;

  props: YMapControlProps = {};
}

describe('YMapControlDirective', () => {
  let component: YMapControlDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlInstance: ReturnType<typeof mockYMapControlInstance>;
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

    // This class is extended, so mock it.
    mockYMapGroupEntityConstructor(mockYMapGroupEntityInstance());

    controlInstance = mockYMapControlInstance();
    controlConstructorMock = mockYMapControlConstructor(controlInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(controlInstance.addChild).toHaveBeenCalled();
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
    const props: YMapControlProps = {
      transparent: true,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapControlProps = {
      transparent: false,
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
