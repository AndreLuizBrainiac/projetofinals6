import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/login/auth.service';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioCadastroDTO } from 'src/app/ModelDTO/UsuarioCadastroDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataFormEditService {

  private  API = `${environment.API}`;
  private user:Usuario = this.authService.getUsuario();

 
 private headersUsuarioLogado = new HttpHeaders({
   "Authorization": "Basic " + btoa(`${this.user.email}:${this.user.senha}`),
   "Content-Type": "application/json",
   "Accept": "application/json"
 });


 constructor(
   private http: HttpClient,
   private authService: AuthService) { }

 
 

 private getUsuarioLogado(){

  let endPoint = 'usuarioCadastro/consultaUsuario';
  console.log(`${this.API}${endPoint}`);
   
  return this.http.get(`${this.API}${endPoint}`, {'headers':this.headersUsuarioLogado}).pipe(take(1));

 }

 getUser(){
   return this.getUsuarioLogado().pipe(take(1));
 }
 
 private atualiar(pessoa:any){
  let endPoint = `usuarioCadastro`;
  console.log(`${this.API}${endPoint}`);
  
  return this.http.put(`${this.API}${endPoint}`, JSON.stringify(pessoa), {'headers':this.headersUsuarioLogado}).pipe(take(1));
}

 update(pessoa:any){
  
   return this.atualiar(pessoa).pipe(take(1));
 }

}
