import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../admin/usuarios/user.model';
import { UsersService } from '../usuarios.service';
import { UserService } from '../../servicios/user.service';
import { Usuario } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {
  users: Usuario[] = [];
  loading = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
  this.loading = true;
  this.usersService.getAll().subscribe({
    next: (data: any) => {
      if (data && Array.isArray(data.$values)) {
        this.users = data.$values;
      } else {
        this.users = [];
        console.error('Formato inesperado de la respuesta', data);
      }
      this.loading = false;
    },
    error: () => {
      alert('Error cargando usuarios');
      this.loading = false;
    },
  });
}



  editar(id: number) {
    this.router.navigate(['/users/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usersService.delete(id).subscribe(() => this.loadUsers());
    }
  }
}
