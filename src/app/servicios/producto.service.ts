import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  costoTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://localhost:7273/api/producto';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.$values as Producto[])
    );
  }
}
