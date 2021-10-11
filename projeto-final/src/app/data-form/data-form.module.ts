import { SharedModule } from './../shared/shared.module';
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormRoutingModule } from './data-form.routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataFormRoutingModule
  ],
  declarations: [
    DataFormComponent
  ]
})
export class DataFormModule { }
