import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'https://localhost:7273/api/Ventas'; // Ajusta tu backend

  constructor(private http: HttpClient) {}

  obtenerVentas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearVenta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizarVenta(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
