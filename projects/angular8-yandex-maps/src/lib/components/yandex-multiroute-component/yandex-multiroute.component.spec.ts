import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexMultirouteComponent } from './yandex-multiroute.component';

describe('YandexMultirouteComponent', () => {
  let component: YandexMultirouteComponent;
  let fixture: ComponentFixture<YandexMultirouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YandexMultirouteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexMultirouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
