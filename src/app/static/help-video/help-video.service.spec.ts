import { TestBed, inject } from '@angular/core/testing';

import { HelpVideoService } from './help-video.service';

describe('HelpVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpVideoService]
    });
  });

  it('should be created', inject(
    [HelpVideoService],
    (service: HelpVideoService) => {
      expect(service).toBeTruthy();
    }
  ));
});
