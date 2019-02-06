import { TestBed, inject } from '@angular/core/testing';

import { FinalComponentGuardService } from './final-component-guard.service';

describe('FinalComponentGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalComponentGuardService]
    });
  });

  it('should be created', inject(
    [FinalComponentGuardService],
    (service: FinalComponentGuardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
