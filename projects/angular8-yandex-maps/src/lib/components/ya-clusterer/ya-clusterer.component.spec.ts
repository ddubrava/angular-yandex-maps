import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaClustererComponent } from './ya-clusterer.component';

describe('YaClustererComponent', () => {
  let component: YaClustererComponent;
  let fixture: ComponentFixture<YaClustererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaClustererComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaClustererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
