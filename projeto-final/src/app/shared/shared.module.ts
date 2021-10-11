import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    AlertModalComponent,
    ConfirmModalComponent,
  ],
  exports: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    AlertModalComponent,
    ConfirmModalComponent

    
  ],
  providers: [ DropdownService ]
})
export class SharedModule { }
