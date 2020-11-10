import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaControlDirective } from './ya-control.directive';

describe('Directive: YaControl', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaControlDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
