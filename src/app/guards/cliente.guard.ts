import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class clienteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const rol = this.authService.getRol();

    if (rol === 'cliente') {
      return true;
    }

    // Si no es cliente, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
