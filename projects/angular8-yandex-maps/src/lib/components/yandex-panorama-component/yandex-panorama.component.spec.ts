import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexPanoramaComponent } from './yandex-panorama.component';

describe('YandexPanoramaComponent', () => {
  let component: YandexPanoramaComponent;
  let fixture: ComponentFixture<YandexPanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YandexPanoramaComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
