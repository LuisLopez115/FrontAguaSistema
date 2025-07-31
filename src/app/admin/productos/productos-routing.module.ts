import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  { path: '', component: ProductosComponent }  // Ruta base para este módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
