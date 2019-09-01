import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexPlacemarkComponent } from './yandex-placemark.component';

describe('YandexPlacemarkComponent', () => {
  let component: YandexPlacemarkComponent;
  let fixture: ComponentFixture<YandexPlacemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YandexPlacemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexPlacemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
