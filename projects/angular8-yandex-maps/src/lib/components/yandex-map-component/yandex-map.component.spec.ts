import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexMapComponent } from './yandex-map.component';

describe('NgYandexMapComponent', () => {
  let component: YandexMapComponent;
  let fixture: ComponentFixture<YandexMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YandexMapComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
