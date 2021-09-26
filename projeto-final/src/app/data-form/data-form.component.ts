import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DataFormService } from './services/data-form.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  doSomething(): void {
    throw new Error('Method not implemented.');
  }

  
  estados!: EstadoBr[];
  cidades!: Cidade[];


  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService,
    private dataformService:DataFormService
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

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      termos: [false, Validators.requiredTrue],
      
    });

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
          map((estados:any) => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades => this.cidades = cidades);

     
  }

  
  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);
    
    console.log(valueSubmit)


    //API chamada para o service que utiliza a API do projeto
    this.dataformService.save(valueSubmit)

    // TESTE COM API PARA VER SE O POST ESTÁ FUNCIONANDO
    /*
    this.http
        .post('https://httpbin.org/post', JSON.stringify({}))
        .subscribe(
          dados => {
            console.log(dados);
            // reseta o form
        
             this.resetar();
          },
          (error: any) => alert('erro')
        );
        */
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados:any) {
   
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


}
