import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YMapEntity, YMapProps } from '@yandex/ymaps3-types';
import { BehaviorSubject, Subject } from 'rxjs';

import { mockYMapConstructor, mockYMapInstance } from '../../../test-utils';
import { YApiLoaderService } from '../../services/y-api-loader/y-api-loader.service';
import { YConfig } from '../../types/y-config';
import { YReadyEvent } from '../../types/y-ready-event';
import * as GenerateRandomIdModule from '../../utils/generate-random-id/generate-random-id';
import { generateRandomId } from '../../utils/generate-random-id/generate-random-id';
import { YMapComponent } from './y-map.component';

@Component({
  standalone: true,
  imports: [YMapComponent],
  template: '<y-map [props]="props" [children]="children" />',
})
class MockHostComponent {
  @ViewChild(YMapComponent, { static: true }) map!: YMapComponent;

  props: YMapProps = {
    location: {
      center: [0, 0],
      zoom: 10,
    },
  };

  children?: YMapEntity<unknown, object>[];
}

describe('YMapComponent', () => {
  let component: YMapComponent;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let mapConstructorMock: jest.Mock;

  let config$: Subject<YConfig> = new BehaviorSubject({});

  beforeEach(async () => {
    config$ = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [MockHostComponent],
      providers: [
        {
          provide: YApiLoaderService,
          useValue: {
            load: () => config$,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.map;

    mapInstance = mockYMapInstance();
    mapConstructorMock = mockYMapConstructor(mapInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create map', () => {
    const random = 'random_test_id';
    jest.spyOn(GenerateRandomIdModule, 'generateRandomId').mockReturnValue(random);

    fixture.detectChanges();

    expect(component.container.nativeElement.style.width).toBe('100%');
    expect(component.container.nativeElement.style.height).toBe('100%');
    expect(component.container.nativeElement.id).toBe(random);

    expect(mapConstructorMock).toHaveBeenCalledWith(
      component.container.nativeElement,
      mockComponent.props,
      mockComponent.children,
    );
  });

  it('should destroy map on config changes', () => {
    fixture.detectChanges();

    config$.next({ lang: 'en_US' });
    expect(mapInstance.destroy).toHaveBeenCalled();
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: mapInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapProps = {
      location: {
        center: [50, 50],
        zoom: 5,
      },
    };

    const children = [{} as YMapEntity<unknown, object>];

    mockComponent.props = props;
    mockComponent.children = children;

    fixture.detectChanges();

    expect(mapConstructorMock).toHaveBeenCalledWith(
      component.container.nativeElement,
      props,
      children,
    );
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapProps = {
      location: {
        center: [45, 45],
        zoom: 10,
      },
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(mapInstance.update).toHaveBeenCalledWith(props);
  });
});
