import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild } from '@angular/core';
import { YaClustererComponent } from './ya-clusterer.component';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-clusterer #clusterer></ya-clusterer>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('clusterer', { static: true }) clusterer: YaClustererComponent;
}

describe('YaClustererComponent', () => {
  let component: YaClustererComponent;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.clusterer;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
