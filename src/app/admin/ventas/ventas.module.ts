import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
