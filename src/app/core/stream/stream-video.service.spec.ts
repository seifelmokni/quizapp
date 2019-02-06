import { TestBed, inject } from '@angular/core/testing';

import { StreamVideoService } from './stream-video.service';

describe('StreamVideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamVideoService]
    });
  });

  it('should be created', inject(
    [StreamVideoService],
    (service: StreamVideoService) => {
      expect(service).toBeTruthy();
    }
  ));
});
