import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormEditRoutingModule } from './data-form-edit.routing.module';
import { DataFormEditComponent } from './data-form-edit.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataFormEditRoutingModule
  ],
  declarations: [
    DataFormEditComponent
  ]
})
export class DataFormEditModule { }
