import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-final';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService,
              private location: Location,
              private router: Router) {

  }

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      (mostrar:any) => this.mostrarMenu = mostrar
    );
  }

  logout(){
    console.log('logout');
    this.authService.setAutenticacao(false);
    location.reload();
  //  this.router.navigate(['/login'])
  }
}
