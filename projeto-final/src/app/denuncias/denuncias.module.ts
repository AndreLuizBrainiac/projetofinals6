import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaDenunciaComponent } from './lista-denuncia/lista-denuncia.component';
import { CadastroDenunciaComponent } from './cadastro-denuncia/cadastro-denuncia.component';
import { DenunciasRoutingModule } from './denuncias.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DenunciasRoutingModule,
  ],
  declarations: [CadastroDenunciaComponent, ListaDenunciaComponent]
})
export class DenunciasModule { }
