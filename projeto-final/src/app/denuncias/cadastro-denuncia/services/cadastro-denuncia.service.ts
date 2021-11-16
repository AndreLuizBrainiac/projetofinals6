import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroDenunciaService {

   // ir no diretório environment e mudar a url da API
   private  API = `${environment.API}`;
   private headers = new HttpHeaders({
     "Content-Type": "application/json",
     "Accept": "application/json"
   });

  constructor(private http: HttpClient) { }

   //endPoint a ser utilizado na API
  private create(denunciaCadastro:any) {

    let endPoint = 'cadastroDenuncia';
    console.log(`${this.API}${endPoint}`);
    console.log(denunciaCadastro);
    //TESTE API FAKE
   // return this.http.post( 'https://httpbin.org/post', JSON.stringify(denunciaCadastro), {'headers':this.headers}).pipe(take(1));

    //API REAL
    return this.http.post(`${this.API}${endPoint}`, JSON.stringify(denunciaCadastro), {'headers':this.headers}).pipe(take(1));
  }

  save(denunciaCadastro:any) {
  
    return this.create(denunciaCadastro).pipe(take(1));
  }
}
