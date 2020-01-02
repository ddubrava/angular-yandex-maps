import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexControlComponent } from './yandex-control.component';

describe('YandexControlComponent', () => {
  let component: YandexControlComponent;
  let fixture: ComponentFixture<YandexControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YandexControlComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
