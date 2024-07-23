import { TestBed } from '@angular/core/testing';

import { CannabisService } from './cannabis.service';

describe('CannabisService', () => {
  let service: CannabisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CannabisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
