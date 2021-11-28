import { TestBed } from '@angular/core/testing';

import { DataFormEditService } from './data-form-edit.service';

describe('DataFormEditService', () => {
  let service: DataFormEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFormEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
