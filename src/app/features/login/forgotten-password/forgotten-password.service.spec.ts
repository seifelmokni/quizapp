import { TestBed, inject } from '@angular/core/testing';

import { ForgottenPasswordService } from './forgotten-password.service';

describe('ForgottenPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgottenPasswordService]
    });
  });

  it('should be created', inject(
    [ForgottenPasswordService],
    (service: ForgottenPasswordService) => {
      expect(service).toBeTruthy();
    }
  ));
});
