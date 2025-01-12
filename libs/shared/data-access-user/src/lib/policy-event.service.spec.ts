import { TestBed } from '@angular/core/testing';

import { PolicyEventService } from './policy-event.service';

describe('PolicyEventService', () => {
  let service: PolicyEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
