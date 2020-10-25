import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustererComponent } from './clusterer.component';

describe('ClustererComponent', () => {
  let component: ClustererComponent;
  let fixture: ComponentFixture<ClustererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClustererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClustererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
