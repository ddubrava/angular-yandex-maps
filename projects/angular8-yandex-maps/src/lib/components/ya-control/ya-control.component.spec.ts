import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaControlComponent } from './ya-control.component';

describe('YaControlComponent', () => {
  let component: YaControlComponent;
  let fixture: ComponentFixture<YaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaControlComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
