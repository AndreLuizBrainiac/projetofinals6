import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/login/auth.service';
import { Usuario } from 'src/app/login/usuario';
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

 
 private atualiar(email:any){
   let endPoint = 'consultaUsuario';
   console.log(`${this.API}${endPoint}`);
   
   return this.http.post(`${this.API}${endPoint}`, JSON.stringify(email), {'headers':this.headersUsuarioLogado}).pipe(take(1));
 }
 

 update(){
  
   return this.atualiar(this.user.email).pipe(take(1));
 }
}
