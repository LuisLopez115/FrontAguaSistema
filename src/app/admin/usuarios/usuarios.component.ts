import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { UserService } from '../../servicios/user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: '../../users/user-list/user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        alert('Error cargando usuarios');
        this.loading = false;
      },
    });
  }

  editar(id: number) {
    this.router.navigate(['/admin/users/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
