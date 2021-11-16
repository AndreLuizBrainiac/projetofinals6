import { TestBed } from '@angular/core/testing';

import { ListaDenunciaService } from './lista-denuncia.service';

describe('ListaDenunciaService', () => {
  let service: ListaDenunciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDenunciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
