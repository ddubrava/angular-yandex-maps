import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaPlacemarkDirective } from './ya-placemark.directive';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-placemark #placemark></ya-placemark>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('placemark', { static: true }) placemark: YaPlacemarkDirective;
}

describe('Directive: YaPlacemark', () => {
  let component: YaPlacemarkDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.placemark;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
