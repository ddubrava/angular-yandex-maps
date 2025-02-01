import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { mockMapInstance, mockRoutePanel, mockRoutePanelConstructor } from '../../../test-utils';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaControlDirective, YaControlType } from './ya-control.directive';

@Component({
  template: '<ya-control [type]="type" [parameters]="parameters"></ya-control>',
  standalone: false,
})
class MockHostComponent {
  @ViewChild(YaControlDirective, { static: true }) control!: YaControlDirective;

  type?: YaControlType = 'RoutePanel';

  parameters: any;
}

describe('YaControlDirective', () => {
  let component: YaControlDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockMapInstance>;
  let routePanelMock: ReturnType<typeof mockRoutePanel>;
  let routePanelConstructorMock: jest.Mock;

  beforeEach(async () => {
    mapInstance = mockMapInstance();

    await TestBed.configureTestingModule({
      declarations: [MockHostComponent, YaControlDirective],
      providers: [
        {
          provide: YaMapComponent,
          useValue: {
            isBrowser: true,
            map$: new BehaviorSubject(mapInstance),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    mockComponent = fixture.componentInstance;
    component = mockComponent.control;

    routePanelMock = mockRoutePanel();
    routePanelConstructorMock = mockRoutePanelConstructor(routePanelMock);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create control', () => {
    fixture.detectChanges();
    expect(routePanelConstructorMock).toHaveBeenCalledWith(undefined);
    expect(mapInstance.controls.add).toHaveBeenCalledWith(routePanelMock);
  });

  it('should emit ready on control load', () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    const readyEvent: YaReadyEvent = {
      ymaps: window.ymaps,
      target: routePanelMock,
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

    mockComponent.parameters = parameters;
    fixture.detectChanges();

    expect(routePanelConstructorMock.mock.calls[0][0]).toEqual(parameters);
  });

  it('should not call constructor if type is undefined', () => {
    mockComponent.type = undefined;
    fixture.detectChanges();
    expect(routePanelConstructorMock).not.toBeCalled();
  });

  it('should manually set state for RoutePanel', () => {
    const parameters = {
      state: {
        from: 'Омск',
        to: 'Москва',
      },
    };

    // Change instanceof behaviour
    Object.defineProperty(routePanelConstructorMock, Symbol.hasInstance, {
      value: () => true,
    });

    mockComponent.parameters = parameters;
    fixture.detectChanges();

    expect(routePanelMock.routePanel.state.set).toHaveBeenCalledWith(parameters.state);
  });

  it('should console warn if parameters is passed after init', () => {
    fixture.detectChanges();

    console.warn = jest.fn();

    mockComponent.parameters = {
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

    expect(mapInstance.controls.remove).toHaveBeenCalledWith(routePanelMock);
  });
});
