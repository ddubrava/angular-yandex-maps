import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { YMapTileDataSourceProps } from '@yandex/ymaps3-types';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapInstance,
  mockYMapTileDataSourceConstructor,
  mockYMapTileDataSourceInstance,
} from '../../../../test-utils';
import type { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapTileDataSourceDirective } from './y-map-tile-data-source.directive';

@Component({
  imports: [YMapTileDataSourceDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<y-map-tile-data-source [props]="props" />',
})
class MockHostComponent {
  @ViewChild(YMapTileDataSourceDirective, { static: true })
  tile!: YMapTileDataSourceDirective;

  props: YMapTileDataSourceProps = {
    id: 'a-source',
  };
}

describe('YMapTileDataSourceDirective', () => {
  let component: YMapTileDataSourceDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let sourceInstance: ReturnType<typeof mockYMapTileDataSourceInstance>;
  let sourceConstructorMock: jest.Mock;

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
    component = mockComponent.tile;

    sourceInstance = mockYMapTileDataSourceInstance();
    sourceConstructorMock = mockYMapTileDataSourceConstructor(sourceInstance);
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', () => {
    fixture.detectChanges();

    expect(sourceConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(mapInstance.addChild).toHaveBeenCalledWith(sourceInstance);
  });

  it('should emit ready on load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: sourceInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', () => {
    const props: YMapTileDataSourceProps = {
      id: 'b-source',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(sourceConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', () => {
    fixture.detectChanges();

    const props: YMapTileDataSourceProps = {
      id: 'c-source',
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(sourceInstance.update).toHaveBeenCalledWith(props);
  });

  it('should remove entity on destroy', async () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapInstance.removeChild).toHaveBeenCalledWith(sourceInstance);
  });
});
