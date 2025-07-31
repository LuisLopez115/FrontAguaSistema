import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../Proveedor';

@Component({
  selector: 'app-formulario-proveedor',
  templateUrl: '../form-proveedor/form-proveedor.component.html'
})
export class FormularioProveedorComponent {
  @Input() proveedorParaEditar: Proveedor | null = null;
  @Output() onGuardar = new EventEmitter<Proveedor>();
  @Output() onCancelar = new EventEmitter<void>();

  proveedorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      tel: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  get esEditar() {
    return this.proveedorParaEditar !== null;
  }

  ngOnChanges() {
    if (this.proveedorParaEditar) {
      this.proveedorForm.patchValue(this.proveedorParaEditar);
    }
  }

  guardarProveedor() {
    if (this.proveedorForm.valid) {
      const proveedor: Proveedor = {
        ...this.proveedorParaEditar,
        ...this.proveedorForm.value
      };
      this.onGuardar.emit(proveedor);
      this.proveedorForm.reset();
    }
  }

  cancelar() {
    this.proveedorForm.reset();
    this.onCancelar.emit();
  }
}
