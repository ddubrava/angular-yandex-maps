import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgYandexMapComponent } from './ng-yandex-map.component';

describe('NgYandexMapComponent', () => {
  let component: NgYandexMapComponent;
  let fixture: ComponentFixture<NgYandexMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgYandexMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgYandexMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
