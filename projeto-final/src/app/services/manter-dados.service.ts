import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DenunciaCadastroDTO } from '../ModelDTO/DenunciaCadastroDTO';
import { AlertModalService } from '../shared/alert-modal.service';
import { FormType } from '../shared/base-form/form-type';

@Injectable({
  providedIn: 'root'
})
export class ManterDadosService {

  private manterDenunciaDTO!:DenunciaCadastroDTO;
  private formType!:FormType;

  constructor(
    private router: Router,
    private http: HttpClient,
    private modal: AlertModalService
  ) { }

  getManterDenuncia(): DenunciaCadastroDTO {
    return this.manterDenunciaDTO;
  }

  setManterDenuncia(manterDenunciaDTO:DenunciaCadastroDTO) {
    return this.manterDenunciaDTO = manterDenunciaDTO;
  }

  setFormType(formType: FormType){
    this.formType = formType;
  }

  getFormType(): FormType{
    return this.formType;
  }
}
