import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaDenunciaService {

  // ir no diretório environment e mudar a url da API
  private  API = `${environment.API}`;
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });

 constructor(private http: HttpClient) { }


 
 private listAll() {

  //endPoint a ser utilizado na API
  let endPoint = 'listagemDenuncia';
  console.log(`${this.API}${endPoint}`);
   

  return this.http.get<DenunciaCadastroDTO[]>(`${this.API}${endPoint}`)
  
 }

 private romover(id:any){

  let endPoint = 'removerDenuncia';
  console.log(`${this.API}${endPoint}`);

  return this.http.delete(`${this.API}${endPoint}/${id}`);
 }

 
 remove(id:any){

  return this.romover(id).pipe(take(1));

 }

 list() {
 
   return this.listAll().pipe(
    delay(2000),
    tap(console.log));
 }

}
