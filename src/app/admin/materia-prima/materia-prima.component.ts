import { Component, OnInit } from '@angular/core';
import { Proveedor, ProveedoresService } from '../../servicios/proveedor.service';
import { MateriaPrima, MateriaPrimaService } from '../../servicios/Materia-prima.service';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  materias: MateriaPrima[] = [];
  proveedores: Proveedor[] = [];

  materiaSeleccionada: MateriaPrima = this.limpiarMateria();
  modoEdicion: boolean = false;

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private proveedoresService: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.cargarMaterias();
    this.cargarProveedores();
  }

  cargarMaterias(): void {
    this.materiaPrimaService.getMaterias().subscribe({
      next: (data: MateriaPrima[]) => {
        this.materias = data;
      },
      error: err => console.error('Error al cargar materias primas', err)
    });
  }

  cargarProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (data: Proveedor[]) => {
        this.proveedores = data;
      },
      error: err => console.error('Error al cargar proveedores', err)
    });
  }

  limpiarMateria(): MateriaPrima {
    return {
      id: 0,
      descripcion: '',
      nombre: '',
      costoPromedio: 0,
      cantidadStock: 0,
      proveedorId: 0,
      proveedor: undefined as any // Evita errores si no viene el objeto completo
    };
  }

  abrirFormulario(): void {
    this.materiaSeleccionada = this.limpiarMateria();
    this.modoEdicion = true;
  }

  seleccionarMateria(materia: MateriaPrima): void {
    this.materiaSeleccionada = {
      ...materia,
      proveedorId: materia.proveedorId || 0
    };
    this.modoEdicion = true;
  }

  guardarMateria(): void {
    const materiaParaEnviar = {
      id: this.materiaSeleccionada.id,
      descripcion: this.materiaSeleccionada.descripcion,
      nombre: this.materiaSeleccionada.nombre,
      costoPromedio: this.materiaSeleccionada.costoPromedio,
      cantidadStock: this.materiaSeleccionada.cantidadStock,
      proveedorId: this.materiaSeleccionada.proveedorId
    };

    const peticion = materiaParaEnviar.id && materiaParaEnviar.id !== 0
      ? this.materiaPrimaService.actualizarMateria(materiaParaEnviar)
      : this.materiaPrimaService.agregarMateria(materiaParaEnviar);

    peticion.subscribe({
      next: () => {
        this.cargarMaterias();
        this.cancelarEdicion();
      },
      error: err => console.error('Error al guardar materia prima', err)
    });
  }

  cancelarEdicion(): void {
    this.materiaSeleccionada = this.limpiarMateria();
    this.modoEdicion = false;
  }

  eliminarMateria(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar esta materia prima?')) return;

    this.materiaPrimaService.eliminarMateria(id).subscribe({
      next: () => this.cargarMaterias(),
      error: err => console.error('Error al eliminar materia prima', err)
    });
  }

  // ✅ Función para mostrar el nombre del proveedor por ID
  obtenerNombreProveedor(id: number): string {
    const proveedor = this.proveedores.find(p => p.id === id);
    return proveedor ? proveedor.nombre : 'Proveedor no asignado';
  }
}
