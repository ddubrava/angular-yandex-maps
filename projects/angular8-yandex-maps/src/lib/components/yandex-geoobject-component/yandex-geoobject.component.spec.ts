import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexGeoobjectComponent } from './yandex-geoobject.component';

describe('YandexGeoobjectComponent', () => {
  let component: YandexGeoobjectComponent;
  let fixture: ComponentFixture<YandexGeoobjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YandexGeoobjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexGeoobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
