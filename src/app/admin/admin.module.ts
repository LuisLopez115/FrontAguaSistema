import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { AdminComponent } from './admin.component'; // standalone
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { VentaFormComponent } from './ventas/venta-form/venta-form.component';
import { ListaVentasComponent } from './ventas/lista-ventas/lista-ventas.component'; //  IMPORTADO AQUÍ

@NgModule({
  declarations: [
    DashboardComponent,
    ProveedoresComponent,
    MateriaPrimaComponent,
    VentaFormComponent,

    ListaVentasComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class AdminModule { }
