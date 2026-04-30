import { TestBed } from '@angular/core/testing';

import { External } from './external';

describe('External', () => {
  let service: External;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(External);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
