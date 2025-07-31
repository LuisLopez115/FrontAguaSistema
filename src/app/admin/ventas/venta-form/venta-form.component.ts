import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../servicios/ventas.service';
import { UsersService } from '../../../users/usuarios.service';
import { ProductoService } from '../../../servicios/producto.service'; // importa bien la ruta
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css'],
})
export class VentaFormComponent implements OnInit {
  clientes: any[] = [];
  productos: any[] = [];


  ventaForm = {
    id: null,
    usuarioId: null,
    comentarios: '',
    detalles: [] as Array<{ productoId: number; cantidad: number; precioUnitario: number }>
  };

  constructor(
    private ventasService: VentasService,
    private usersService: UsersService,
        private productoService: ProductoService,
              private router: Router 


  ) {}

  ngOnInit() {
    this.cargarClientes();
    this.agregarDetalle(); // Empieza con un detalle vacío
    this.cargarProductos();
  }
    cargarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }


  cargarClientes() {
    this.usersService.getAll().subscribe({
      next: (data: any) => {
        const clientesArray = data.$values || data;
        this.clientes = clientesArray.filter(
          (u: any) => u.rol?.toLowerCase() === 'cliente'
        );
      },
      error: (err) => console.error('Error cargando clientes', err),
    });
  }

  agregarDetalle() {
    this.ventaForm.detalles.push({ productoId: 0, cantidad: 1, precioUnitario: 0 });
  }

  quitarDetalle(index: number) {
    this.ventaForm.detalles.splice(index, 1);
  }

  guardarVenta() {
    if (!this.ventaForm.usuarioId) {
      alert('Selecciona un cliente antes de guardar');
      return;
    }

    if (this.ventaForm.id) {
      // Actualizar (PUT)
      this.ventasService.actualizarVenta(this.ventaForm.id, this.ventaForm).subscribe({
        next: () => {
          alert('Venta actualizada con éxito');
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error actualizando venta', err);
          alert('Error actualizando venta');
        },
      });
    } else {
      // Crear (POST)
      this.ventasService.crearVenta(this.ventaForm).subscribe({
        next: () => {
          alert('Venta creada con éxito');
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error creando venta', err);
          alert('Error creando venta');
        },
      });
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.router.navigate(['/admin/ventas']); // Ajusta la ruta según la que uses
  }

  limpiarFormulario() {
    this.ventaForm = {
      id: null,
      usuarioId: null,
      comentarios: '',
      detalles: [],
    };
    this.agregarDetalle();
  }
}
