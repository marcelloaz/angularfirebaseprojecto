import { TestBed } from '@angular/core/testing';

import { FirebaseDbrtService } from './firebase-dbrt.service';

describe('FirebaseDbrtService', () => {
  let service: FirebaseDbrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDbrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
