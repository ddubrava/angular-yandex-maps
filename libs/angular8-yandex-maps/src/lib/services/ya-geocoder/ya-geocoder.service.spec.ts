import { TestBed } from '@angular/core/testing';

import { createGeocoderSpy, createReadySpy } from '../../testing/fake-ymaps-utils';
import { YaGeocoderService } from './ya-geocoder.service';

describe('YaGeocoderService', () => {
  let readySpy: jasmine.Spy<jasmine.Func>;
  let geocoderSpy: jasmine.Spy<jasmine.Func>;
  let service: YaGeocoderService;

  beforeEach(() => {
    readySpy = createReadySpy();
    geocoderSpy = createGeocoderSpy();
    service = TestBed.inject(YaGeocoderService);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should geocode', (done) => {
    const request = 'Moscow';

    service.geocode(request).subscribe((v) => {
      expect(v).toEqual({});
      done();
    });

    expect(readySpy).toHaveBeenCalled();
    expect(geocoderSpy).toHaveBeenCalledWith(request, undefined);
  });

  it('should geocode with options', () => {
    const request = 'Omsk';

    const options = {
      json: true,
      results: 5,
      skip: 1,
    };

    service.geocode(request, options).subscribe();
    expect(geocoderSpy).toHaveBeenCalledWith(request, options);
  });
});
