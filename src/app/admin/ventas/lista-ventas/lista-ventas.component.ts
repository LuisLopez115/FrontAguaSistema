

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas.service';



@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']

})

export class ListaVentasComponent implements OnInit {
  ventas: any[] = [];
  detallesMostrar: any;
  modalInstance: any;



  constructor(
    private ventasService: VentasService,
    private router: Router  // Inyecta el Router para navegación
  ) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.ventasService.obtenerVentas().subscribe({
      next: (data) => {
        console.log('Ventas crudas:', data);
        this.ventas = data.$values.map((venta: any) => ({
          ...venta,
          detalles: venta.detalles && venta.detalles.$values ? venta.detalles.$values : []
        }));
        console.log('Ventas transformadas:', this.ventas);
      },
      error: (err) => console.error('Error cargando ventas', err)
    });
  }

  editarVenta(venta: any): void {
    // Navega a un formulario de edición pasando el id de la venta
    this.router.navigate(['/admin/ventas/editar', venta.id]);
  }

  eliminarVenta(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar esta venta?')) return;

    this.ventasService.eliminarVenta(id).subscribe({
      next: () => {
        alert('Venta eliminada');
        this.cargarVentas(); // Refresca la lista después de borrar
      },
      error: err => console.error('Error eliminando venta', err)
    });
  }


mostrarModal: boolean = false;
detallesFiltrados: any[] = [];

verDetalles(detalles: any[]) {
  this.mostrarModal = true;

  this.detallesFiltrados = detalles.map((item: any) => ({
    id: item.id,
    producto: item.producto,
    cantidad: item.cantidad,
    precio: item.precio
  }));
}
cerrarModal() {
  this.mostrarModal = false;
    console.log('Cerrar modal');  // <-- para verificar que se dispara

}


}

