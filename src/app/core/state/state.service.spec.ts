import { TestBed, inject } from '@angular/core/testing';

import { StateService } from '@app/core/state/state.service';

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService]
    });
  });

  it('should be created', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
