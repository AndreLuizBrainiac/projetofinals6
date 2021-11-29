import { TestBed } from '@angular/core/testing';

import { ManterDadosService } from './manter-dados.service';

describe('ManterDadosService', () => {
  let service: ManterDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManterDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
