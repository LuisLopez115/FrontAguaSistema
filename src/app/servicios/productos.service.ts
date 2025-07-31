import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Ingrediente {
  materiaPrima?: {
    descripcion: string;
  };
  cantidad: number;
}

export interface ProductoPlano {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  receta: Ingrediente[];
}

export interface ProductoConRawReceta {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  receta?: {
    $values: Ingrediente[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://localhost:7273/api/producto';

  constructor(private http: HttpClient) {}

 getProductos(): Observable<ProductoPlano[]> {
  return this.http.get<any>(this.apiUrl).pipe(
    map((response) => {
      const productosRaw = response.$values ?? []; // accede al array
      return productosRaw.map((p: ProductoConRawReceta) => ({
        ...p,
        receta: p.receta?.$values || []
      }));
    })
  );
}

}
