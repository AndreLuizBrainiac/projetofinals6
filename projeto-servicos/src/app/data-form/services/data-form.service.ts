import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {

 
 
   // ir no diretório environment e mudar a url da API
  private  API = `${environment.API}`;
 

  constructor(private http: HttpClient) { }

  //endPoint a ser utilizado na API
  private create(usuarioCadastro:any) {
    let endPoint = 'usuarioCadastro';
    console.log(this.API+endPoint)
    console.log(JSON.stringify(usuarioCadastro));
    return this.http.post( this.API+endPoint, JSON.stringify(usuarioCadastro)).pipe(take(1));
  }

  save(usuarioCadastro:any) {
  
    return this.create(usuarioCadastro).pipe(take(1));
  }
}
