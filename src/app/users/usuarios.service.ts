import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://localhost:7273/api/Usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

 
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

create(user: Usuario): Observable<any> {
  const userParaEnviar = {
    nombre: user.nombre,
    Correo: user.correo,      // ojo la C mayúscula
   password:user.password,
    rol: user.rol,
    telefono: user.telefono
  };

  return this.http.post(`${this.apiUrl}/crear`, userParaEnviar);
}

update(id: number, user: Usuario): Observable<any> {
  const userParaEnviar = {
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    contraseña: user.password,
    rol: user.rol,
    telefono: user.telefono
  };

  return this.http.put(`${this.apiUrl}/${id}`, userParaEnviar); // esta está bien
}



}
