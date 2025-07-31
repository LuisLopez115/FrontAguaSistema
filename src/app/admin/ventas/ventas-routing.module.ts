import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';

const routes: Routes = [
  { path: '', component: ListaVentasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
