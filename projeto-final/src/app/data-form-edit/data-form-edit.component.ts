import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, EMPTY } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, map, take } from 'rxjs/operators';
import { VerificaEmailService } from '../data-form/services/verifica-email.service';
import { AuthService } from '../login/auth.service';
import { AlertModalService } from '../shared/alert-modal.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormType } from '../shared/base-form/form-type';
import { FormValidations } from '../shared/form-validations';
import { Cidade } from '../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { DataFormEditService } from './services/data-form-edit.service';

@Component({
  selector: 'app-data-form-edit',
  templateUrl: './data-form-edit.component.html',
  styleUrls: ['./data-form-edit.component.css']
})
export class DataFormEditComponent extends BaseFormComponent implements OnInit {
  
  
  doSomething(): void {
    throw new Error('Method not implemented.');
  }

  estados!: EstadoBr[];
  cidades!: Cidade[];
  submitted = false;
  formtype = FormType.EDIT;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService,
    private dataformService: DataFormEditService,
    private modal: AlertModalService,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {

    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);


    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [Validators.required, FormValidations.equalsTo('email')]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      documento: [null, [Validators.required, Validators.minLength(5)]],
      tel: [null, [Validators.required, Validators.minLength(3)]],


      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

    });

    if(this.formtype==FormType.EDIT){
      let msgError = 'Erro ao recuperar usuario!, tente mais tarde';
     
      this.dataformService.update().subscribe(
        dados => {
                  this.populaDadosFormEdit(dados);
         
        },

        error =>  this.modal.showAlertDanger(msgError)
      );

    }

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados?.filter(e => e.sigla === estado)),
        map((estados: any) => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);


  }


  submit() {
    this.submitted = true;

    let valueSubmit = Object.assign({}, this.formulario.value);
    let msgSuccess  = 'Usuário atualizado com sucesso!';
    let msgError    = 'Erro ao atualizar o Usuario, tente novamente!';

    
    // CHAMA PARA O SERVICE QUE UTILIZA A API DO PROJETO
    this.dataformService.update().subscribe(
      success => {
        
        this.modal.showAlertSuccess(msgSuccess);
       
     //   this.location.reload();
      },
      error => this.modal.showAlertDanger(msgError)
    );
        
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  
  populaDadosFormEdit(dados: any) {

    this.formulario.patchValue({
      nome: dados.nome,
      email: dados.email,
      confirmarEmail: dados.confirmarEmail,
      senha: dados.senha,
      documento: dados.documento,
      tel: dados.tel,

      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      },

    });

  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }


  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }


  onCancel() {
    this.submitted = false;

    const result$ = this.modal.showConfirm('Deseja abandonar?', 'Alterações não salvas', 'Sim', 'Não');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.router.navigate(['/login']) : EMPTY)
      ).subscribe(result => {
        this.authService.setAutenticacao(false),
        this.formulario.reset(),
        console.log('cancelando cadastro')
        location.reload();
      }
      );


    // console.log('onCancel');
  }


}
