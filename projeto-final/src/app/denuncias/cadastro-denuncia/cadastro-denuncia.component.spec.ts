import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDenunciaComponent } from './cadastro-denuncia.component';

describe('CadastroDenunciaComponent', () => {
  let component: CadastroDenunciaComponent;
  let fixture: ComponentFixture<CadastroDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDenunciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
