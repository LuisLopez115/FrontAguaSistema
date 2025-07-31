import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get esAdmin(): boolean {
    return this.auth.getRol()?.toLowerCase() === 'administrador';
  }

  get esCliente(): boolean {
    return this.auth.getRol()?.toLowerCase() === 'cliente';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
