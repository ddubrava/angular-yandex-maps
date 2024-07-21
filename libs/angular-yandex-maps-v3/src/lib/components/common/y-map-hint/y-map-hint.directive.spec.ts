import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import {
  mockYMapGroupEntityConstructor,
  mockYMapGroupEntityInstance,
  mockYMapHintConstructor,
  mockYMapHintContextConstructor,
  mockYMapHintContextInstance,
  mockYMapHintInstance,
  mockYMapInstance,
} from '../../../../test-utils';
import { YMapHintProps } from '../../../types/y-map-hint-props';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';
import { YMapHintDirective } from './y-map-hint.directive';

@Component({
  standalone: true,
  imports: [YMapHintDirective],
  template: `
    <y-map-hint [props]="props">
      <ng-template>Hello World</ng-template>
    </y-map-hint>
  `,
})
class MockHostComponent {
  @ViewChild(YMapHintDirective, { static: true })
  hint!: YMapHintDirective;

  props: YMapHintProps = {
    hint: () => '',
  };
}

describe('YMapHintDirective', () => {
  let component: YMapHintDirective;
  let mockComponent: MockHostComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  let mapInstance: ReturnType<typeof mockYMapInstance>;
  let hintInstance: ReturnType<typeof mockYMapHintInstance>;
  let hintConstructorMock: jest.Mock;

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
    component = mockComponent.hint;

    // This class is extended, so mock it.
    mockYMapGroupEntityConstructor(mockYMapGroupEntityInstance());

    // Two instances are returned from the import function.
    hintInstance = mockYMapHintInstance();
    hintConstructorMock = mockYMapHintConstructor(hintInstance);
    mockYMapHintContextConstructor(mockYMapHintContextInstance());
  });

  afterEach(() => {
    (window as any).ymaps3 = undefined;
  });

  it('should create entity', async () => {
    fixture.detectChanges();

    expect((window as any).ymaps3.import).toHaveBeenCalledWith('@yandex/ymaps3-hint@0.0.1');

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(hintConstructorMock).toHaveBeenCalledWith(mockComponent.props);
    expect(hintInstance.addChild).toHaveBeenCalled();
    expect(mapInstance.addChild).toHaveBeenCalledWith(hintInstance);
  });

  it('should emit ready on load', async () => {
    jest.spyOn(component.ready, 'emit');
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const readyEvent: YReadyEvent = {
      ymaps3: (window as any).ymaps3,
      entity: hintInstance,
    };

    expect(component.ready.emit).toHaveBeenCalledWith(readyEvent);
  });

  it('should pass inputs to constructor', async () => {
    const props: YMapHintProps = {
      hint: (object) => object?.properties,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    expect(hintConstructorMock).toHaveBeenCalledWith(props);
  });

  it('should update props input after init', async () => {
    fixture.detectChanges();

    // ymaps3.import is async, wait for it
    await new Promise(process.nextTick);

    const props: YMapHintProps = {
      hint: () => null,
    };

    mockComponent.props = props;

    fixture.detectChanges();

    expect(hintInstance.update).toHaveBeenCalledWith(props);
  });
});
