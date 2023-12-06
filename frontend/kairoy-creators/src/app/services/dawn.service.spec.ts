import { TestBed } from '@angular/core/testing';

import { DawnService } from './dawn.service';

describe('DawnService', () => {
  let service: DawnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DawnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
