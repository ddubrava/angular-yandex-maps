import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapControlsProps, YMapEntity } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlsConstructor,
  mockYMapControlsInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';
import { YMapControlsDirective } from './y-map-controls.directive';

@Component({
  standalone: true,
  imports: [YMapControlsDirective],
  template: '<y-map-controls [props]="props" [children]="children" />',
})
class MockHostComponent {
  @ViewChild(YMapControlsDirective, { static: true })
  controls!: YMapControlsDirective;

  props: YMapControlsProps = {
    position: 'bottom',
  };

  children?: YMapEntity<unknown, object>[];
}

describe('YMapControlsDirective', () => {
  let component: YMapControlsDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlsConstructorMock: jest.Mock;

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
    component = mockComponent.controls;

    controlsInstance = mockYMapControlsInstance();
    controlsConstructorMock = mockYMapControlsConstructor(controlsInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(controlsConstructorMock).toHaveBeenCalledWith(
      mockComponent.props,
      mockComponent.children,
    );
    expect(mapInstance.addChild).toHaveBeenCalledWith(controlsInstance);
  });

  it('should set instance to subject', () => {
    fixture.detectChanges();

    expect(component.controls$.value).toBe(controlsInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: controlsInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapControlsProps = {
      position: 'top',
    };

    const children = [{}] as YMapEntity<unknown, object>[];

    mockComponent.props = props;
    mockComponent.children = children;

    fixture.detectChanges();

    expect(controlsConstructorMock).toHaveBeenCalledWith(props, children);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapControlsProps = {
      position: 'left',
      orientation: 'horizontal',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlsInstance.update).toHaveBeenCalledWith(props);
  });
});
