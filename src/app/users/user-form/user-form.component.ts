import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../usuarios.service';
import { Usuario } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
user: Usuario = {
  id: 0,
  nombre: '',
  correo: '',
  password: '', 
  rol: '',
  telefono: ''
};


  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;

      this.userService.getById(+id).subscribe(data => this.user = data);
    }
  }

  saveUser() {
    if (this.isEdit) {
      this.userService.update(this.user.id, this.user).subscribe(() => this.router.navigate(['/users']));
    } else {
      this.userService.create(this.user).subscribe(() => this.router.navigate(['/users']));
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
