import { TestBed, inject } from '@angular/core/testing';

import { ConnectionHandlerService } from './connection-handler.service';

describe('ConnectionHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionHandlerService]
    });
  });

  it('should be created', inject([ConnectionHandlerService], (service: ConnectionHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
