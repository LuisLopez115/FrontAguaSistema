import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Proveedor {
  id: number;
  nombre: string;
  tel: string;
  direccion: string;
}

export interface MateriaPrima {
  id: number;
  descripcion: string;
  costoPromedio: number;
  cantidadStock: number;
  nombre: string;
  proveedorId: number;
  proveedor: Proveedor;
}

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  private apiUrl = 'https://localhost:7273/api/MateriaPrima';

  constructor(private http: HttpClient) {}

  // Traer materias primas (arreglado para desestructurar el $values si viene)
  getMaterias(): Observable<MateriaPrima[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.$values ?? response)
    );
  }

  // Crear materia prima: asegurate de enviar el objeto completo con nombre, proveedorId, etc
  agregarMateria(materia: {
    descripcion: string;
    nombre: string;
    costoPromedio: number;
    cantidadStock: number;
    proveedorId: number;
  }): Observable<MateriaPrima> {
    return this.http.post<MateriaPrima>(this.apiUrl, materia);
  }

  // Actualizar materia prima
  actualizarMateria(materia: {
    id: number;
    descripcion: string;
    nombre: string;
    costoPromedio: number;
    cantidadStock: number;
    proveedorId: number;
  }): Observable<MateriaPrima> {
    return this.http.put<MateriaPrima>(`${this.apiUrl}/${materia.id}`, materia);
  }

  // Eliminar materia prima
  eliminarMateria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
