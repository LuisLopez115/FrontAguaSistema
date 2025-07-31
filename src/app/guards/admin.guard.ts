import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.auth.getToken();
    const rol = this.auth.getRol(); // Aquí usas el método que extrae rol del token

    if (token && rol?.toLowerCase() === 'administrador') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
