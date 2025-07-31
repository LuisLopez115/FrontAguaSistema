import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDto {
  Correo: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7273/api/auth';

  constructor(private http: HttpClient) { }

  login(dto: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dto);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
getRol(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  } catch {
    return null;
  }
}


  isLoggedIn(): boolean {
    // Solo valida si existe token, puedes mejorar validando expiración JWT aquí si quieres
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    // localStorage.removeItem('rol'); // No es necesario porque no guardas rol separado
  }
}
