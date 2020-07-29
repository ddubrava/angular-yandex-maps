import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaPanoramaComponent } from './ya-panorama.component';

describe('YaPanoramaComponent', () => {
  let component: YaPanoramaComponent;
  let fixture: ComponentFixture<YaPanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaPanoramaComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
