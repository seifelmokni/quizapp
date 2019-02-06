import { TestBed, inject } from '@angular/core/testing';

import { FinalScreenResolverService } from './final-screen-resolver.service';

describe('FinalScreenResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalScreenResolverService]
    });
  });

  it('should be created', inject(
    [FinalScreenResolverService],
    (service: FinalScreenResolverService) => {
      expect(service).toBeTruthy();
    }
  ));
});
