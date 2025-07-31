import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  ngOnInit(): void {
    // método vacío, pero tiene que existir para cumplir la interfaz
  }
}
