import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/login/auth.service';
import { Usuario } from 'src/app/login/usuario';
import { DenunciaCadastroDTO } from 'src/app/ModelDTO/DenunciaCadastroDTO';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CadastroDenunciaService {

   // ir no diretório environment e mudar a url da API
   private user:Usuario = this.authService.getUsuario();
   private  API = `${environment.API}`;
   private headers = new HttpHeaders({
     
     "Authorization": "Basic " + btoa(`${this.user.email}:${this.user.senha}`),
     "Content-Type": "application/json",
     "Accept": "application/json"
   });

  constructor(
    private http: HttpClient, 
    private authService: AuthService) { 
    //  console.log(this.authService.getUsuario().email);
    }

   //endPoint a ser utilizado na API
  private create(denunciaCadastro:any) {

    let endPoint = 'denuncia'
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

  private atualizar(codigo:any, denuncia:any){

    console.log('codigo test= 3 '+codigo)
    let endPoint = 'denuncia';
    console.log(`${this.API}${endPoint}/${codigo}`);
  
    return this.http.put(`${this.API}${endPoint}/${codigo}`, JSON.stringify(denuncia), {'headers':this.headers});
  }
  
   
  update(codigo:any, denuncia:any){
  
    return this.atualizar(codigo, denuncia).pipe(take(1));
  }
  
}
