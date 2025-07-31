import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-nav',
  templateUrl: './cliente-nav.component.html',
  styleUrls: ['./cliente-nav.component.css']
})
export class ClienteNavComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
