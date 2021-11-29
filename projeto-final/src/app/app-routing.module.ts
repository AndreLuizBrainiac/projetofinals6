import { DataFormComponent } from './data-form/data-form.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DataGuard } from './guards/data.guard';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './home/home.component';
import { CadastroDenunciaComponent } from './denuncias/cadastro-denuncia/cadastro-denuncia.component';
import { ListaDenunciaComponent } from './denuncias/lista-denuncia/lista-denuncia.component';
import { DataFormEditComponent } from './data-form-edit/data-form-edit.component';
import { FeedDeNoticiasComponent } from './feed-de-noticias/feed-de-noticias.component';


const appRoutes: Routes = [
 
 // { path: 'dataForm', 
//    loadChildren: 'app/data-form/data-form.module#DataFormModule',
 //   canActivate: [AuthGuard],
//  },
 
 // { path: '', pathMatch: 'full', redirectTo: 'dataForm' },
  { path: 'login', component: LoginComponent },

//  {path: '', component: DataFormComponent,
//    canActivate: [AuthGuard]
//  },

  { path: '', component: HomeComponent,
    canActivate: [AuthGuard] 
  },

  
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard] 
  },


  { path: 'cadastroDenuncia', component: CadastroDenunciaComponent,
    canActivate: [AuthGuard] 
  },


  { path: 'lista-denuncia', component: ListaDenunciaComponent,
    canActivate: [AuthGuard] 
  },

  { path: 'feed', component: FeedDeNoticiasComponent,
    canActivate: [AuthGuard] 
  },
  

  { path: 'editar-cadastro', loadChildren: () => import('./data-form-edit/data-form-edit.module').then(m => m.DataFormEditModule),
    canActivate: [AuthGuard] 
  },


  { path: 'dataForm', loadChildren: () => import('./data-form/data-form.module').then(m => m.DataFormModule) },


  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
