import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaMapComponent } from './ya-map.component';

describe('YaMapComponent', () => {
  let component: YaMapComponent;
  let fixture: ComponentFixture<YaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaMapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
