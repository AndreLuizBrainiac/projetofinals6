import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertModalService } from '../shared/alert-modal.service';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.API}`;

  private usuarioAutenticado: boolean = false;
  private usuario!: Usuario;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private modal: AlertModalService) { }

  //metodo local para testar login
  fazerLoginTeste(usuario: Usuario) {

    if (usuario.email === 'usuario@email.com' &&
      usuario.senha === '123') {

      this.usuario = usuario;

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmitter.emit(false);
    }
  }

  //END POINT A SER UTILIZADO NA API
  private login(user: Usuario) {
    let endPoint = 'oauth/token';
    let body = new HttpParams();
    body = body.set('username', user.email);
    body = body.set('password', user.senha);
    //Tipo de requisição de token de autenticação do back
    body = body.set('grant_type', 'password');
    return this.http.post<Usuario>(`${this.API}${endPoint}`,
      body,
      {
        headers: {
          //Autorização para poder receber o token de autenticação do back
          Authorization: 'Basic Y2xpZW50OmNsaWVudA==',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).pipe(take(1));
  }

  fazerLogin(user: Usuario) {

    this.login(user).subscribe(
      sucess => {
        
        this.usuario = user;
       
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);

        this.router.navigate(['/']);

      },
      error => {
        this.modal.showAlertDanger('Usuário ou senha invalido!')
        this.usuarioAutenticado = false;

        this.mostrarMenuEmitter.emit(false);

      });

  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  setAutenticacao(aut: boolean) {
    this.usuarioAutenticado = false;
    console.log(this.usuarioAutenticado)

  }

  getUsuario():Usuario {
    return this.usuario;
  }
}
