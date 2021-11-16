import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroDenunciaComponent } from './cadastro-denuncia/cadastro-denuncia.component';
import { ListaDenunciaComponent } from './lista-denuncia/lista-denuncia.component';

const routes: Routes = [
  { path: '', component: ListaDenunciaComponent },

  
  {
    path: 'editar/:id',
    component: CadastroDenunciaComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciasRoutingModule {}
