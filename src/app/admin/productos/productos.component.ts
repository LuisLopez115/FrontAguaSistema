import { Component, OnInit } from '@angular/core';
import { ProductoPlano, ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: ProductoPlano[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
