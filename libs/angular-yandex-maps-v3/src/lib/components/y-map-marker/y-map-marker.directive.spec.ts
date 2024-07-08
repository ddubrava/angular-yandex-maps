import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapMarkerProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapInstance,
  mockYMapMarkerConstructor,
  mockYMapMarkerInstance,
} from '../../../test-utils';
import { YReadyEvent } from '../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapMarkerDirective } from './y-map-marker.directive';

@Component({
  standalone: true,
  imports: [YMapMarkerDirective],
  template: '<y-map-marker [props]="props"><div #element></div></y-map-marker>',
})
class MockHostComponent {
  @ViewChild(YMapMarkerDirective, { static: true })
  feature!: YMapMarkerDirective;

  @ViewChild('element', { static: true })
  element!: ElementRef<HTMLElement>;

  props: YMapMarkerProps = {
    coordinates: [0, 0],
  };
}

describe('YMapMarkerDirective', () => {
  let component: YMapMarkerDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let markerInstance: ReturnType<typeof mockYMapMarkerInstance>;
  let markerConstructorMock: jest.Mock;

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

    markerInstance = mockYMapMarkerInstance();
    markerConstructorMock = mockYMapMarkerConstructor(markerInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create marker', () => {
    fixture.detectChanges();

    expect(markerConstructorMock).toHaveBeenCalledWith(
      mockComponent.props,
      mockComponent.element.nativeElement,
    );

    expect(mapInstance.addChild).toHaveBeenCalledWith(markerInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: markerInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapMarkerProps = {
      coordinates: [10, 10],
      onClick: () => {},
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(markerConstructorMock).toHaveBeenCalledWith(props, mockComponent.element.nativeElement);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapMarkerProps = {
      coordinates: [25, 25],
      blockEvents: true,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(markerInstance.update).toHaveBeenCalledWith(props);
  });
});
