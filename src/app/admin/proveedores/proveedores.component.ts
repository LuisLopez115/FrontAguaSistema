import { Component, OnInit } from '@angular/core';
import { Proveedor, ProveedoresService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: Proveedor[] = [];
  proveedorSeleccionado: Proveedor = this.limpiarProveedor();
  modoEdicion: boolean = false;  // controla si muestra el formulario

  constructor(private proveedorService: ProveedoresService) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  limpiarProveedor(): Proveedor {
    return { id: 0, nombre: '', tel: '', direccion: '' };
  }

  abrirFormulario(): void {
    this.proveedorSeleccionado = this.limpiarProveedor();
    this.modoEdicion = true;
  }

  seleccionarProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = { ...proveedor };
    this.modoEdicion = true;
  }
guardarProveedor(): void {
  const proveedorParaEnviar: any = {
    nombre: this.proveedorSeleccionado.nombre,
    tel: this.proveedorSeleccionado.tel,
    direccion: this.proveedorSeleccionado.direccion,
    materiasPrimas: []  // obligatorio para el backend
  };

  if (this.proveedorSeleccionado.id && this.proveedorSeleccionado.id !== 0) {
    proveedorParaEnviar.id = this.proveedorSeleccionado.id;
    this.proveedorService.actualizarProveedor(proveedorParaEnviar).subscribe({
      next: () => {
        this.cargarProveedores();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al actualizar proveedor', err)
    });
  } else {
    this.proveedorService.agregarProveedor(proveedorParaEnviar).subscribe({
      next: () => {
        this.cargarProveedores();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al agregar proveedor', err)
    });
  }
}




  cancelarEdicion(): void {
    this.proveedorSeleccionado = this.limpiarProveedor();
    this.modoEdicion = false;

}
}
