import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaPlacemarkComponent } from './ya-placemark.component';

describe('YaPlacemarkComponent', () => {
  let component: YaPlacemarkComponent;
  let fixture: ComponentFixture<YaPlacemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaPlacemarkComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaPlacemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
