import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaMultirouteComponent } from './ya-multiroute.component';

describe('YaMultirouteComponent', () => {
  let component: YaMultirouteComponent;
  let fixture: ComponentFixture<YaMultirouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaMultirouteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaMultirouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
