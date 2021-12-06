import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/login/auth.service';
import { Usuario } from 'src/app/login/usuario';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaDenunciaService {

  // ir no diretório environment e mudar a url da API
  private user:Usuario = this.authService.getUsuario();
  private  API = `${environment.API}`;
  private headers = new HttpHeaders({
    "Authorization": "Basic " + btoa(`${this.user.email}:${this.user.senha}`),
    "Content-Type": "application/json",
    "Accept": "application/json"
  });

 constructor(private http: HttpClient, private authService: AuthService) { }


 
 private listMinhasDenuncias() {

  //endPoint a ser utilizado na API
  let endPoint = 'conta/denuncias';
  console.log(`${this.API}${endPoint}`);
   

  return this.http.get<DenunciaCadastroDTO[]>(`${this.API}${endPoint}`, {'headers':this.headers})
  
 }

 private listAll() {

  //endPoint a ser utilizado na API
  let endPoint = 'denuncia';
  console.log(`${this.API}${endPoint}`);
   

  return this.http.get<DenunciaCadastroDTO[]>(`${this.API}${endPoint}`, {'headers':this.headers})
  
 }

 private romover(id:any){

  let endPoint = 'denuncia';
  console.log(`${this.API}${endPoint}/${id}`);

  return this.http.delete(`${this.API}${endPoint}/${id}`, {'headers':this.headers});
 }

 
 remove(id:any){

  return this.romover(id).pipe(take(1));

 }

 list() {
 
   return this.listAll().pipe(
    delay(2000),
    tap(console.log));
 }

 listMinhasDenuncis() {
 
    return this.listMinhasDenuncias().pipe(
    delay(2000),
    tap(console.log));
 }

}
