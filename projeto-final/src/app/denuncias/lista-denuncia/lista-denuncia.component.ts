import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ListaDenunciaService } from './services/lista-denuncia.service';
import { ManterDadosService } from 'src/app/services/manter-dados.service';
import { FormType } from 'src/app/shared/base-form/form-type';

@Component({
  selector: 'app-lista-denuncia',
  templateUrl: './lista-denuncia.component.html',
  styleUrls: ['./lista-denuncia.component.css']
})
export class ListaDenunciaComponent implements OnInit {

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  denuncias$!: Observable<DenunciaCadastroDTO[]>;
  index!:number;
  error$ = new Subject<boolean>();

  denunciaSelecionada!: DenunciaCadastroDTO;

  constructor(
   
    private listaDenunciaService: ListaDenunciaService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private manterDadosService: ManterDadosService
  ) {}

  ngOnInit(): void {

    this.onRefresh();
  }


  onRefresh() {
    
    this.denuncias$ = this.listaDenunciaService.listMinhasDenuncis().pipe(
      // map(),
      // tap(),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  
  }

  handleError() {

    this.alertService.showAlertDanger('Erro ao carregar as denúncias. Tente novamente mais tarde.');
   
  }

  onEdit(denuncia:any) {
   
    denuncia as DenunciaCadastroDTO
    
    this.denunciaSelecionada = denuncia;

    this.manterDadosService.setManterDenuncia(this.denunciaSelecionada);
    this.manterDadosService.setFormType(FormType.EDIT);
    
    this.router.navigate(['/cadastroDenuncia']);
 //   this.router.navigate(['editar', this.denunciaSelecionada.codigo], { relativeTo: this.route });
  }

  onDelete(denuncia:any)  {
    denuncia as DenunciaCadastroDTO
    
    this.denunciaSelecionada = denuncia;
   
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover essa denúncia?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.listaDenunciaService.remove(this.denunciaSelecionada.codigo) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover a denúncia. Tente novamente mais tarde.');
      }
    );
  }

 
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  redirectTO(){
    
    this.router.navigate(['/cadastroDenuncia']);
 
  }
 

}
