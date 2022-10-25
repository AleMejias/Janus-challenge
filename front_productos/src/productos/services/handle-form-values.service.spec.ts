import { TestBed } from '@angular/core/testing';

import { HandleFormValuesService } from './handle-form-values.service';

describe('HandleFormValuesService', () => {
  let service: HandleFormValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleFormValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
