import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YaMultirouteDirective } from './ya-multiroute.directive';
import { AngularYandexMapsModule } from '../../angular-yandex-maps.module';

@Component({
  template: `
    <ya-map>
      <ya-multiroute #multiroute></ya-multiroute>
    </ya-map>
  `,
})
class MockHostComponent {
  @ViewChild('multiroute', { static: true }) multiroute: YaMultirouteDirective;
}

describe('Directive: YaMultiroute', () => {
  let component: YaMultirouteDirective;
  let fixture: ComponentFixture<MockHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
      declarations: [MockHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    component = fixture.componentInstance.multiroute;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
