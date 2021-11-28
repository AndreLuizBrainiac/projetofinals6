import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { CadastroDenunciaService } from './services/cadastro-denuncia.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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


  constructor(

    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private cadastroDenunciaService: CadastroDenunciaService
    
  ) { 
    super();
  }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      titulo: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      descricao: [null, [Validators.required, Validators.minLength(50)]]
      
      
  
    });
  }

  submit() {
    this.submitted = true;

    let valueSubmit = Object.assign({}, this.formulario.value);
    let msgSuccess = 'Denúncia criada com sucesso!';
    let msgError = 'Erro ao criar a denúncia, tente novamente!';

    
    // CHAMA PARA O SERVICE QUE UTILIZA A API DO PROJETO
    this.cadastroDenunciaService.save(valueSubmit).subscribe(
      success => {
        
        this.modal.showAlertSuccess(msgSuccess);
        this.location.back();
      },
      error => this.modal.showAlertDanger(msgError)
    );


  }

  onCancel(){};

}
