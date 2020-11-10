/* tslint:disable:no-unused-variable */

import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { YaClustererDirective } from './ya-clusterer.directive';

describe('Directive: YaClusterer', () => {
  it('should create an instance', () => {
    const ngZone = TestBed.inject(NgZone);

    const directive = new YaClustererDirective(ngZone);
    expect(directive).toBeTruthy();
  });
});
