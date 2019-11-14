import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexGeoObjectComponent } from './yandex-geoobject.component';

describe('YandexGeoobjectComponent', () => {
  let component: YandexGeoObjectComponent;
  let fixture: ComponentFixture<YandexGeoObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YandexGeoObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexGeoObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
