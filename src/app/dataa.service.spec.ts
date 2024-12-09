import { TestBed } from '@angular/core/testing';

import { DataaService } from './dataa.service';

describe('DataaService', () => {
  let service: DataaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
