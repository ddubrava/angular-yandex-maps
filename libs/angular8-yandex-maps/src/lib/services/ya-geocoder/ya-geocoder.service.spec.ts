import { TestBed } from '@angular/core/testing';

import { mockGeocode, mockReady } from '../../testing/fake-ymaps-utils';
import { YaGeocoderService } from './ya-geocoder.service';

describe('YaGeocoderService', () => {
  let readyMock: jest.Mock;
  let geocoderMock: jest.Mock;
  let service: YaGeocoderService;

  beforeEach(() => {
    readyMock = mockReady();
    geocoderMock = mockGeocode();
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

    expect(readyMock).toHaveBeenCalled();
    expect(geocoderMock).toHaveBeenCalledWith(request, undefined);
  });

  it('should geocode with options', () => {
    const request = 'Omsk';

    const options = {
      json: true,
      results: 5,
      skip: 1,
    };

    service.geocode(request, options).subscribe();
    expect(geocoderMock).toHaveBeenCalledWith(request, options);
  });
});
