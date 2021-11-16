import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ListaDenunciaService } from './services/lista-denuncia.service';

@Component({
  selector: 'app-lista-denuncia',
  templateUrl: './lista-denuncia.component.html',
  styleUrls: ['./lista-denuncia.component.css']
})
export class ListaDenunciaComponent implements OnInit {

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  //TESTE
  denunciasTeste$!: Observable<DenunciaCadastroDTO[]>;

  denuncias$!: Observable<DenunciaCadastroDTO[]>;
  error$ = new Subject<boolean>();

  denunciaSelecionada!: DenunciaCadastroDTO;

  constructor(
   
    private listaDenunciaService: ListaDenunciaService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.onRefresh();
  }


  onRefresh() {
    
    this.denuncias$ = this.listaDenunciaService.list().pipe(
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

  onEdit(id:any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(denuncia:any) {
    this.denunciaSelecionada = denuncia;

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover essa denúncia?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.listaDenunciaService.remove(denuncia.id) : EMPTY)
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

  onConfirmDelete() {
    this.listaDenunciaService.remove(this.denunciaSelecionada.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover a denúncia. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
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
