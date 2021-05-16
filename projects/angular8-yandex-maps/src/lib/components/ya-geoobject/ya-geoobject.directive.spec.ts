import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaGeoObjectDirective } from './ya-geoobject.directive';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-geoobject #geoObject></ya-geoobject>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('geoObject', { static: true }) geoObject: YaGeoObjectDirective;
}

describe('Directive: YaGeoObject', () => {
  let component: YaGeoObjectDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.geoObject;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
