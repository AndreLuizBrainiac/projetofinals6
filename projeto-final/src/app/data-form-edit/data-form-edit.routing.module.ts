import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormEditComponent } from './data-form-edit.component';


const dataFormEditRoutes: Routes = [

  { path: '', component: DataFormEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(dataFormEditRoutes)],
  exports: [RouterModule]
})
export class DataFormEditRoutingModule { }