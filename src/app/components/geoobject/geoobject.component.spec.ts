import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoobjectComponent } from './geoobject.component';

describe('GeoobjectComponent', () => {
  let component: GeoobjectComponent;
  let fixture: ComponentFixture<GeoobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeoobjectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
