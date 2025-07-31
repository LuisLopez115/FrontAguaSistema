import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { clienteGuard } from '../guards/cliente.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [clienteGuard],
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'productos', component: ProductosComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
