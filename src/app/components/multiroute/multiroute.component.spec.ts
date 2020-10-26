import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultirouteComponent } from './multiroute.component';

describe('MultirouteComponent', () => {
  let component: MultirouteComponent;
  let fixture: ComponentFixture<MultirouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultirouteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultirouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
