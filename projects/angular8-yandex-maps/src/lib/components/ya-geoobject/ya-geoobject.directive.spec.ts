import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaGeoObjectDirective } from './ya-geoobject.directive';

describe('Directive: YaGeoobject', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaGeoObjectDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
