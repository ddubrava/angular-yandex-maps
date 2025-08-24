import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapOpenMapsButtonProps } from '@yandex/ymaps3-types/modules/controls-extra';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapControlsInstance,
  mockYMapOpenMapsButtonConstructor,
  mockYMapOpenMapsButtonInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';
import { YMapOpenMapsButtonDirective } from './y-map-open-maps-button.directive';

@Component({
  standalone: true,
  imports: [YMapOpenMapsButtonDirective],
  template: '<y-map-open-maps-button [props]="props"  />',
})
class MockHostComponent {
  @ViewChild(YMapOpenMapsButtonDirective, { static: true })
  element!: YMapOpenMapsButtonDirective;

  props: YMapOpenMapsButtonProps = {};
}

describe('YMapOpenMapsButtonDirective', () => {
  let component: YMapOpenMapsButtonDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let controlsInstance: ReturnType<typeof mockYMapControlsInstance>;
  let controlInstance: ReturnType<typeof mockYMapOpenMapsButtonInstance>;
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
    component = mockComponent.element;

    controlInstance = mockYMapOpenMapsButtonInstance();
    controlConstructorMock = mockYMapOpenMapsButtonConstructor(controlInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', async () => {
    fixture.detectChanges();

    expect((window as any).ymaps3.import).toHaveBeenCalledWith('@yandex/ymaps3-controls-extra');

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(controlConstructorMock).toHaveBeenCalledWith(mockComponent.props);
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
    const props: YMapOpenMapsButtonProps = {
      title: 'Hello world',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(controlConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const props: YMapOpenMapsButtonProps = {
      title: 'Google Maps',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(controlInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    fixture.destroy();

    expect(controlsInstance.removeChild).toHaveBeenCalledWith(controlInstance);
  });
});
