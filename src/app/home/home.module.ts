import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module'

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './page/home-page/home-page.component';
import { TipoCompraComponent } from './components/tipo-compra/tipo-compra.component';
import { RegistroAuto1Component } from './components/registroAuto1/registro-auto1.component';


@NgModule({
  declarations: [
    HomePageComponent,
    TipoCompraComponent,
    RegistroAuto1Component,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule
  ]
})
export class HomeModule { }
