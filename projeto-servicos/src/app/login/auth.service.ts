import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = `${environment.API}`;

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
    private http: HttpClient) { }

  //metodo local para testar login
  fazerLoginTeste(usuario: Usuario) {

    if (usuario.nome === 'usuario@email.com' &&
      usuario.senha === '123') {

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
    let endPoint = 'userLogin';
    return this.http.get<Usuario>(`${this.API}${endPoint}${'/'}${user.nome}`).pipe(take(1));
  }

  fazerLogin(user: Usuario) {

    this.login(user).subscribe((usuarioCadastrado: Usuario) => {
      if (user.nome === usuarioCadastrado.nome &&
        user.senha === usuarioCadastrado.senha) {

        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);

        this.router.navigate(['/']);

      } else {
        this.usuarioAutenticado = false;

        this.mostrarMenuEmitter.emit(false);
      }
    });

  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  setAutenticacao(aut: boolean) {
    this.usuarioAutenticado = false;
    console.log(this.usuarioAutenticado)

  }
}
