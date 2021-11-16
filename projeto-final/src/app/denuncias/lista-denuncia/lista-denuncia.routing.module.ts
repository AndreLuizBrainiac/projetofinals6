import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDenunciaComponent } from './lista-denuncia.component';


const listaDenunciaComponentRoutes: Routes = [

  { path: '', component: ListaDenunciaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(listaDenunciaComponentRoutes)],
  exports: [RouterModule]
})
export class ListaDenunciaRoutingModule { }