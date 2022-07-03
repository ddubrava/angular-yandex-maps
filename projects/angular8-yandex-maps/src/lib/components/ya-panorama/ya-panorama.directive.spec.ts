import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { YaReadyEvent } from '../../models/ya-ready-event';
import {
  createMapSpy,
  createPlayerConstructorSpy,
  createPlayerSpy,
} from '../../testing/fake-ymaps-utils';
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
})
class MockHostComponent {
  @ViewChild(YaPanoramaDirective, { static: true }) panorama: YaPanoramaDirective;

  point: number[] = [0, 0];

  layer: ymaps.panorama.Layer;

  options: ymaps.panorama.IPlayerOptions;

  handleDestroy(): void {}

  handleFullscreenExit(): void {}
}

describe('YaPanoramaDirective', () => {
  let component: YaPanoramaDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let playerSpy: jasmine.SpyObj<ymaps.panorama.Player>;
  let playerConstructorSpy: jasmine.Spy;
  let locateSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaPanoramaDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            container: { nativeElement: { id: 'random_test_id' } },
            isBrowser: true,
            map$: new BehaviorSubject(mapSpy),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.panorama;
    playerSpy = createPlayerSpy();
    playerConstructorSpy = createPlayerConstructorSpy(playerSpy);

    window.ymaps.panorama.locate = jasmine.createSpy('locate').and.returnValue(
      new Observable((observer) => {
        observer.next([{}]);
      }),
    );

    locateSpy = window.ymaps.panorama.locate as jasmine.Spy;
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create panorama', () => {
    fixture.detectChanges();
    expect(mapSpy.destroy).toHaveBeenCalled();
    expect(locateSpy).toHaveBeenCalledWith([0, 0], { layer: undefined });
    expect(playerConstructorSpy).toHaveBeenCalledWith('random_test_id', {}, undefined);
  });

  it('should emit ready on panorama load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: playerSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set point and layer', () => {
    const point = [50, 50];
    const layer = 'yandex#airPanorama';

    fixture.componentInstance.point = point;
    fixture.componentInstance.layer = layer;
    fixture.detectChanges();

    expect(locateSpy).toHaveBeenCalledWith(point, { layer });
  });

  it('should set player options', () => {
    const options = {
      controls: [],
      direction: [180, 90],
      scrollZoomBehavior: false,
      span: [10, 50],
      suppressMapOpenBlock: true,
    };

    fixture.componentInstance.options = options;

    fixture.detectChanges();

    expect(playerConstructorSpy.calls.mostRecent()?.args[2]).toEqual(options);
  });

  it('should set point and layer after init', () => {
    fixture.detectChanges();

    const point = [50, 50];
    const layer = 'yandex#airPanorama';

    fixture.componentInstance.point = point;
    fixture.componentInstance.layer = layer;
    fixture.detectChanges();

    expect(playerSpy.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should set point after init if layer is not passed', () => {
    fixture.detectChanges();

    const point = [50, 50];

    fixture.componentInstance.point = point;
    fixture.detectChanges();

    expect(playerSpy.moveTo).toHaveBeenCalledWith(point, { layer: undefined });
  });

  it('should use previous point if is not passed when setting layer after init', () => {
    const point = [0, 0];
    fixture.componentInstance.point = point;

    fixture.detectChanges();

    const layer = 'yandex#airPanorama';
    fixture.componentInstance.layer = layer;

    fixture.detectChanges();

    expect(playerSpy.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should use previous layer if is not passed when setting point after init', () => {
    const layer = 'yandex#airPanorama';
    fixture.componentInstance.layer = layer;

    fixture.detectChanges();

    const point = [10, 10];
    fixture.componentInstance.point = point;

    fixture.detectChanges();

    expect(playerSpy.moveTo).toHaveBeenCalledWith(point, { layer });
  });

  it('should set span and direction after init', () => {
    fixture.detectChanges();

    const span = [10, 10];
    const direction = [0, -50];

    fixture.componentInstance.options = {
      span,
      direction,
    };

    fixture.detectChanges();

    expect(playerSpy.setDirection).toHaveBeenCalledWith(direction);
    expect(playerSpy.setSpan).toHaveBeenCalledWith(span);
  });

  it('should console warn if unsupported options are passed after init', () => {
    fixture.detectChanges();

    const options = {
      controls: [],
      scrollZoomBehavior: true,
    };

    console.warn = jasmine.createSpy('warn');

    fixture.componentInstance.options = options;
    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalled();
  });

  it('should init event handlers that are set on the panorama', () => {
    const addSpy = playerSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('destroy', jasmine.any(Function));
    expect(addSpy).toHaveBeenCalledWith('fullscreenexit', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('directionchange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('error', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('fullscreenenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('markercollapse', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('markerexpand', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('markermouseenter', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('markermouseleave', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('panoramachange', jasmine.any(Function));
    expect(addSpy).not.toHaveBeenCalledWith('spanchange', jasmine.any(Function));
  });

  it('should be able to add an event listener after init', () => {
    const addSpy = playerSpy.events.add;
    fixture.detectChanges();

    expect(addSpy).not.toHaveBeenCalledWith('error', jasmine.any(Function));

    // Pick an event that isn't bound in the template.
    const subscription = fixture.componentInstance.panorama.yaerror.subscribe();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith('error', jasmine.any(Function));
    subscription.unsubscribe();
  });
});
