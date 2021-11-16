import { TestBed } from '@angular/core/testing';

import { CadastroDenunciaService } from './cadastro-denuncia.service';

describe('CadastroDenunciaService', () => {
  let service: CadastroDenunciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroDenunciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
