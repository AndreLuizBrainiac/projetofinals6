import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { CadastroDenunciaService } from './services/cadastro-denuncia.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ManterDadosService } from 'src/app/services/manter-dados.service';
import { FormType } from 'src/app/shared/base-form/form-type';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { map, tap, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-denuncia',
  templateUrl: './cadastro-denuncia.component.html',
  styleUrls: ['./cadastro-denuncia.component.css']
})
export class CadastroDenunciaComponent extends BaseFormComponent implements OnInit {
 

  doSomething(): void {
    throw new Error('Method not implemented.');
  }

  submitted = false;
  private formType:FormType = FormType.INCLUDE;


  constructor(

    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private cadastroDenunciaService: CadastroDenunciaService,
    private manterDadosService: ManterDadosService,
    private router: Router,
    
  ) { 
    super();
  }

  ngOnInit(): void {

  
    this.formulario = this.formBuilder.group({
      
      titulo: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      descricao: [null, [Validators.required, Validators.minLength(30), Validators.maxLength(300)]]

    });

    if(this.manterDadosService.getFormType() == FormType.EDIT){
     
      this.formType = this.manterDadosService.getFormType();
      this.populaDadosForm(this.manterDadosService.getManterDenuncia());
    }

  }

  submit() {
    this.submitted = true;

    let valueSubmit = Object.assign({}, this.formulario.value); 
    let dto:DenunciaCadastroDTO = this.manterDadosService.getManterDenuncia();;
    let valueSubmitUpdate = Object.assign({}, this.formulario.value); 
    let msgSuccess = 'Denúncia criada com sucesso!';
    let msgError = 'Erro ao criar a denúncia, tente novamente!';
    let msgSuccessUpdate = 'Denúncia atualizada com sucesso!';
    let msgErrorUpdate = 'Erro ao atualizar a denúncia, tente novamente!';

    if(this.manterDadosService.getFormType() == FormType.EDIT){
     
      valueSubmitUpdate.codigo = dto.codigo
      valueSubmitUpdate.codigo_pessoa = dto.codigo_pessoa;
      valueSubmitUpdate.status = dto.status;
    }
    
    
    // CHAMA PARA O SERVICE QUE UTILIZA A API DO PROJETO
    if(this.formType == FormType.EDIT){
      this.manterDadosService.setFormType(FormType.INCLUDE)
      this.cadastroDenunciaService.update( dto.codigo, valueSubmitUpdate).subscribe(
        success => {
  
          this.formType = FormType.INCLUDE;
          this.manterDadosService.setFormType( FormType.INCLUDE);
          this.modal.showAlertSuccess(msgSuccessUpdate);
          this.location.back();
          
        },
        error => {
          
          this.formType = FormType.INCLUDE;
          this.manterDadosService.setFormType( FormType.INCLUDE);
          this.modal.showAlertDanger(msgErrorUpdate);
          this.location.back(); 
        }
      );
    }else{
      console.log('entro includ')
      this.cadastroDenunciaService.save(valueSubmit).subscribe(
        success => {
         
            this.formType = FormType.INCLUDE;
            this.manterDadosService.setFormType( FormType.INCLUDE);
            this.modal.showAlertSuccess(msgSuccess);
            this.location.back();

        },
        error => {
          
          this.formType = FormType.INCLUDE;
          this.manterDadosService.setFormType( FormType.INCLUDE);
          this.modal.showAlertDanger(msgError);
          this.location.back();
        }
      );
      
    }

  }

  populaDadosForm(dados: DenunciaCadastroDTO) {

    this.formulario.patchValue({
     
      titulo: dados.titulo,
      descricao: dados.descricao
      
    });

  }

  onCancel(){
    this.submitted = false;

    const result$ = this.modal.showConfirm('Deseja abandonar?', 'Alterações não salvas', 'Sim', 'Não');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.router.navigate(['/lista-denuncia']) : EMPTY)  
      ).subscribe(result => {
        this.formType = FormType.INCLUDE;
        this.manterDadosService.setFormType(FormType.INCLUDE)
        this.formulario.reset(),
        console.log('cancelando cadastro');
    
      }
    );

  };


}


