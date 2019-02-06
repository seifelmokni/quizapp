import { TestBed, inject } from '@angular/core/testing';

import { ExtraLivesService } from './extra-lives.service';

describe('ExtraLivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraLivesService]
    });
  });

  it('should be created', inject(
    [ExtraLivesService],
    (service: ExtraLivesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
