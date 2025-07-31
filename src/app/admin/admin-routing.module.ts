import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { ListaVentasComponent } from './ventas/lista-ventas/lista-ventas.component';
import { VentaFormComponent } from './ventas/venta-form/venta-form.component';

const routes: Routes = [
  { path: 'inicio', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'materia-prima', component: MateriaPrimaComponent },
  {
    path: 'ventas',
    children: [
      { path: '', component: ListaVentasComponent },
      { path: 'nueva', component: VentaFormComponent },
            { path: 'editar/:id', component: VentaFormComponent } // <-- esta línea es la clave

    ]
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
