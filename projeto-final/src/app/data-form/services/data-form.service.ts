import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {
 
   // ir no diretório environment e mudar a url da API
  private  API = `${environment.API}`;
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });
 

  constructor(private http: HttpClient) { }

  //endPoint a ser utilizado na API
  private create(usuarioCadastro:any) {

    let endPoint = 'usuarioCadastro';
    console.log(`${this.API}${endPoint}`);
    console.log(JSON.stringify(usuarioCadastro));
    //CHAMADA ANTIGA
   // return this.http.post(`${this.API}${endPoint}`, JSON.stringify(usuarioCadastro)).pipe(take(1));
    return this.http.post(`http://cors-anywhere.herokuapp.com/${this.API}${endPoint}`, JSON.stringify(usuarioCadastro), {'headers':this.headers}).pipe(take(1));
  }

  save(usuarioCadastro:any) {
  
    return this.create(usuarioCadastro).pipe(take(1));
  }
}
