import { TestBed } from '@angular/core/testing';

import { XCompraService } from './x-compra.service';

describe('XCompraService', () => {
  let service: XCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
