import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaPanoramaDirective } from './ya-panorama.directive';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-panorama #panorama></ya-panorama>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('panorama', { static: true }) panorama: YaPanoramaDirective;
}

describe('YaPanoramaDirective', () => {
  let component: YaPanoramaDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.panorama;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
