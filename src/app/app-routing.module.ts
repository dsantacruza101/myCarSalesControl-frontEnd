import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('../app/home/home.module').then(hm => hm.HomeModule),
    canActivate: [ authGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
