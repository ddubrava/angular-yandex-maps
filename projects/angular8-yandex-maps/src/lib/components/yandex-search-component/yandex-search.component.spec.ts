import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexSearchComponent } from './yandex-search.component';

describe('YandexSearchComponent', () => {
  let component: YandexSearchComponent;
  let fixture: ComponentFixture<YandexSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YandexSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
