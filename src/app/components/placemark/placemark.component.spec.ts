import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacemarkComponent } from './placemark.component';

describe('PlacemarkComponent', () => {
  let component: PlacemarkComponent;
  let fixture: ComponentFixture<PlacemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacemarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
