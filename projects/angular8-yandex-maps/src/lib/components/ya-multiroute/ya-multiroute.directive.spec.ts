import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaMultirouteDirective } from './ya-multiroute.directive';

describe('Directive: YaMultiroute', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaMultirouteDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
