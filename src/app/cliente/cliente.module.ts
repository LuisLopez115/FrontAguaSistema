import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { RouterModule } from '@angular/router';
import { ClienteNavComponent } from './cliente-nav/cliente-nav.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';

@NgModule({
  declarations: [
    ClienteNavComponent,
    InicioComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    RouterModule
  ],
  exports: [
    ClienteNavComponent
  ]
})
export class ClienteModule { }
