import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import {
  mockLocate,
  mockMapInstance,
  mockPlayer,
  mockPlayerConstructor,
} from '../../../test-utils';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaPanoramaDirective } from './ya-panorama.directive';

@Component({
  template: `
    <ya-panorama
      [point]="point"
      [layer]="layer"
      [options]="options"
      (destroy)="handleDestroy()"
      (fullscreenexit)="handleFullscreenExit()"
    ></ya-panorama>
  `,
  standalone: false,
})
class MockHostComponent {
  @ViewChild(YaPanoramaDirective, { static: true }) panorama!: YaPanoramaDirective;

  point?: number[];

  layer?: ymaps.panorama.Layer;

  options?: ymaps.panorama.IPlayerOptions;

  handleDestroy(): void {}

  handleFullscreenExit(): void {}
}

describe('YaPanoramaDirective', () => {
  let component: YaPanoramaDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let playerMock: ReturnType<typeof mockPlayer>;
  let playerConstructorMock: jest.Mock;
  let locateMock: ReturnType<typeof mockLocate>;

  let map$: BehaviorSubject<typeof mapInstance>;

  beforeEach(async () => {
    mapInstance = mockMapInstance();
    map$ = new BehaviorSubject(mapInstance);

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaPanoramaDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            container: { nativeElement: { id: 'random_test_id' } },
            isBrowser: true,
            map$,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.panorama;

    playerMock = mockPlayer();
    playerConstructorMock = mockPlayerConstructor(playerMock);
    locateMock = mockLocate();
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create panorama', () => {
    mockComponent.point = [0, 0];
    fixture.detectChanges();

    expect(mapInstance.destroy).toHaveBeenCalled();
    expect(locateMock).toHaveBeenCalledWith([0, 0], { layer: undefined });
    expect(playerConstructorMock).toHaveBeenCalledWith('random_test_id', {}, undefined);
  });

  it('should destroy map and player on map changes', () => {
    fixture.detectChanges();

    map$.next(mapInstance);

    expect(mapInstance.destroy).toHaveBeenCalled();
    expect(playerMock.destroy).toHaveBeenCalled();
  });

  it('should emit ready on panorama load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: playerMock,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set point and layer', () => {
    const point = [50, 50];
    const layer = 'yandex#airPanorama';

    mockComponent.point = point;
    mockComponent.layer = layer;
    fixture.detectChanges();

    expect(locateMock).toHaveBeenCalledWith(point, { layer });
  });

  it('should set player options', () => {
    const options = {
      controls: [],
      direction: [180, 90],
      scrollZoomBehavior: false,
      span: [10, 50],
      suppressMapOpenBlock: true,
    };

    mockComponent.options = options;

    fixture.detectChanges();

    expect(playerConstructorMock.mock.calls[0][2]).toEqual(options);
  });

  it('should set point and layer after init', () => {
    fixture.detectChanges();

    const point = [50, 50];
    const layer = 'yandex#airPanorama';

    mockComponent.point = point;
    mockComponent.layer = layer;
    fixture.detectChanges();

    expect(playerMock.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should set point after init if layer is not passed', () => {
    fixture.detectChanges();

    const point = [50, 50];

    mockComponent.point = point;
    fixture.detectChanges();

    expect(playerMock.moveTo).toHaveBeenCalledWith(point, { layer: undefined });
  });

  it('should use previous point if is not passed when setting layer after init', () => {
    const point = [0, 0];
    mockComponent.point = point;

    fixture.detectChanges();

    const layer = 'yandex#airPanorama';
    mockComponent.layer = layer;

    fixture.detectChanges();

    expect(playerMock.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should use previous layer if is not passed when setting point after init', () => {
    const layer = 'yandex#airPanorama';
    mockComponent.layer = layer;

    fixture.detectChanges();

    const point = [10, 10];
    mockComponent.point = point;

    fixture.detectChanges();

    expect(playerMock.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should set span and direction after init', () => {
    fixture.detectChanges();

    const span = [10, 10];
    const direction = [0, -50];

    mockComponent.options = {
      span,
      direction,
    };

    fixture.detectChanges();

    expect(playerMock.setDirection).toHaveBeenCalledWith(direction);
    expect(playerMock.setSpan).toHaveBeenCalledWith(span);
  });

  it('should console warn if unsupported options are passed after init', () => {
    fixture.detectChanges();

    const options = {
      controls: [],
      scrollZoomBehavior: true,
    };

    console.warn = jest.fn();

    mockComponent.options = options;
    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalled();
  });

  it('should init event handlers that are set on the panorama', () => {
    const addMock = playerMock.events.add;
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('destroy', expect.any(Function));
    expect(addMock).toHaveBeenCalledWith('fullscreenexit', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('directionchange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('error', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('fullscreenenter', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('markercollapse', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('markerexpand', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('markermouseenter', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('markermouseleave', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('panoramachange', expect.any(Function));
    expect(addMock).not.toHaveBeenCalledWith('spanchange', expect.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addMock = playerMock.events.add;
    fixture.detectChanges();

    expect(addMock).not.toHaveBeenCalledWith('error', expect.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = mockComponent.panorama.yaerror.subscribe();
    fixture.detectChanges();

    expect(addMock).toHaveBeenCalledWith('error', expect.any(Function));
    subscription.unsubscribe();
  });
});
