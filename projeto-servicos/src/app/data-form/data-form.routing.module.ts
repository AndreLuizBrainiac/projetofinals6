import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormComponent } from './data-form.component';

const dataFormRoutes: Routes = [

  { path: '', component: DataFormComponent },
  //  { path: '', pathMatch: 'full', redirectTo: 'dataForm' }

];

@NgModule({
  imports: [RouterModule.forChild(dataFormRoutes)],
  exports: [RouterModule]
})
export class DataFormRoutingModule { }