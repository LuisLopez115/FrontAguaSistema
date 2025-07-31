import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Proveedor {
  id?: number; // opcional al crear, obligatorio al editar
  nombre: string;
  tel: string;
  direccion: string;
  materiasPrimas?: any[]; // opcional, depende de tu modelo
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  eliminarProveedor(id: number) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://localhost:7273/api/Proveedores';

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response?.$values ?? response)
    );
  }

  // Crear un nuevo proveedor
  agregarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  // Actualizar un proveedor existente
  actualizarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    if (!proveedor.id) {
      throw new Error('El proveedor debe tener un ID para actualizar');
    }
    return this.http.put<Proveedor>(`${this.apiUrl}/${proveedor.id}`, proveedor);
  }
}
