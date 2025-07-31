import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // si tienes estilos personalizados
})
export class HomeComponent {
  productosDestacados = [

  ];

  constructor(private router: Router) {}

  verDetalles(id: number) {
    this.router.navigate(['/productos', id]);
  }

  irACotizacion() {
    this.router.navigate(['/cotizacion']);
  }
}
