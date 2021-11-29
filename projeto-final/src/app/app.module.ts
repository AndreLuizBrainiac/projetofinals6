import { NgModule } from '@angular/core';

import { DataFormModule } from './data-form/data-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DataGuard } from './guards/data.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './login/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { DenunciasModule } from './denuncias/denuncias.module';
import { DataFormEditModule } from './data-form-edit/data-form-edit.module';
import { ManterDadosService } from './services/manter-dados.service';
import { FeedDeNoticiasComponent } from './feed-de-noticias/feed-de-noticias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    HomeComponent,
    FeedDeNoticiasComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
   
    DataFormEditModule,
    DenunciasModule,
    DataFormModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    AuthService, 
    AuthGuard,
    DataGuard,
    ManterDadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
