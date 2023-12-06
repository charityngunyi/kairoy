import { TestBed } from '@angular/core/testing';

import { Web5Service } from './web5.service';

describe('Web5Service', () => {
  let service: Web5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
