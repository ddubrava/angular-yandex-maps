import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaGeoobjectDirective } from './ya-geoobject.directive';

describe('Directive: YaGeoobject', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaGeoobjectDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
