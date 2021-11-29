import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, empty, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { ListaDenunciaService } from '../denuncias/lista-denuncia/services/lista-denuncia.service';
import { DenunciaCadastroDTO } from '../ModelDTO/DenunciaCadastroDTO';
import { ManterDadosService } from '../services/manter-dados.service';
import { AlertModalService } from '../shared/alert-modal.service';
import { FormType } from '../shared/base-form/form-type';

@Component({
  selector: 'app-feed-de-noticias',
  templateUrl: './feed-de-noticias.component.html',
  styleUrls: ['./feed-de-noticias.component.css']
})
export class FeedDeNoticiasComponent implements OnInit {

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
