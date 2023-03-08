import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';

import {YaReadyEvent} from '../../interfaces/ya-ready-event';
import {createMapSpy, createRoutePanelConstructorSpy, createRoutePanelSpy,} from '../../testing/fake-ymaps-utils';
import {YaMapComponent} from '../ya-map/ya-map.component';
import {YaControlDirective, YaControlType} from './ya-control.directive';

@Component({
  template: '<ya-control [type]="type" [parameters]="parameters"></ya-control>',
})
class MockHostComponent {
  @ViewChild(YaControlDirective, { static: true }) control: YaControlDirective;

  type: YaControlType = 'RoutePanel';

  parameters: any;
}

describe('YaControlDirective', () => {
  let component: YaControlDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapSpy: jasmine.SpyObj<ymaps.Map>;
  let routePanelSpy: jasmine.SpyObj<ymaps.control.RoutePanel>;
  let routePanelConstructorSpy: jasmine.Spy;

  beforeEach(async () => {
    mapSpy = createMapSpy();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaControlDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            isBrowser: true,
            map$: new BehaviorSubject(mapSpy),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.control;
    routePanelSpy = createRoutePanelSpy();
    routePanelConstructorSpy = createRoutePanelConstructorSpy(routePanelSpy);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create control', () => {
    fixture.detectChanges();

    expect(routePanelConstructorSpy).toHaveBeenCalledWith(undefined);
    expect(mapSpy.controls.add).toHaveBeenCalledWith(routePanelSpy);
  });

  it('should emit ready on control load', () => {
    spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: routePanelSpy,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should set parameters', () => {
    const parameters = {
      options: {
        floatIndex: 10,
        maxWidth: '300px',
        visible: false,
        showHeader: true,
      },
      state: {
        from: 'Москва',
        to: 'Санкт-Петербург',
      },
    };

    fixture.componentInstance.parameters = parameters;
    fixture.detectChanges();

    expect(routePanelConstructorSpy.calls.mostRecent()?.args[0]).toEqual(parameters);
  });

  it('should manually set state for RoutePanel', () => {
    const parameters = {
      state: {
        from: 'Омск',
        to: 'Москва',
      },
    };

    // Change instanceof behaviour
    Object.defineProperty(routePanelConstructorSpy, Symbol.hasInstance, {
      value: () => true,
    });

    fixture.componentInstance.parameters = parameters;
    fixture.detectChanges();

    expect(routePanelSpy.routePanel.state.set).toHaveBeenCalledWith(parameters.state);
  });

  it('should console warn if parameters is passed after init', () => {
    fixture.detectChanges();

    console.warn = jasmine.createSpy('warn');

    fixture.componentInstance.parameters = {
      options: {
        floatIndex: 5,
      },
    };

    fixture.detectChanges();

    expect(console.warn).toHaveBeenCalled();
  });

  it('should remove control from map.controls on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(mapSpy.controls.remove).toHaveBeenCalledWith(routePanelSpy);
  });
});
