import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { YaGeoObjectComponent } from './ya-geoobject.component';

describe('YaGeoObjectComponent', () => {
  let component: YaGeoObjectComponent;
  let fixture: ComponentFixture<YaGeoObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YaGeoObjectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaGeoObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
