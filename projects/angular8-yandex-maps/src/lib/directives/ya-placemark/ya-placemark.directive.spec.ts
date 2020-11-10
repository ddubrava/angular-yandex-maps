import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaPlacemarkDirective } from './ya-placemark.directive';

describe('Directive: YaPlacemark', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaPlacemarkDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
