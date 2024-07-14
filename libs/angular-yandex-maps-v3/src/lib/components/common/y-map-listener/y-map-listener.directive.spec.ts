import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapListenerProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapInstance,
  mockYMapListenerConstructor,
  mockYMapListenerInstance,
} from '../../../../test-utils';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapListenerDirective } from './y-map-listener.directive';

@Component({
  standalone: true,
  imports: [YMapListenerDirective],
  template: '<y-map-listener [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapListenerDirective, { static: true })
  feature!: YMapListenerDirective;

  props: YMapListenerProps = {};
}

describe('YMapListenerDirective', () => {
  let component: YMapListenerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let listenerInstance: ReturnType<typeof mockYMapListenerInstance>;
  let listenerConstructorMock: jest.Mock;

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
    component = mockComponent.feature;

    listenerInstance = mockYMapListenerInstance();
    listenerConstructorMock = mockYMapListenerConstructor(listenerInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(listenerConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(listenerInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: listenerInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapListenerProps = {
      onClick: () => {},
      onResize: () => {},
      onContextMenu: () => {},
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(listenerConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapListenerProps = {
      onMouseDown: () => {},
      onDblClick: () => {},
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(listenerInstance.update).toHaveBeenCalledWith(props);
  });
});
