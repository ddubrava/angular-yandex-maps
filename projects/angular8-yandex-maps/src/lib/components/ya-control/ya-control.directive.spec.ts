import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaControlDirective } from './ya-control.directive';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-control #control></ya-control>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('control', { static: true }) control: YaControlDirective;
}

describe('Directive: YaControl', () => {
  let component: YaControlDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.control;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
