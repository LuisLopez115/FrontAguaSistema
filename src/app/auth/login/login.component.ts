import { Component } from '@angular/core';
import { AuthService, LoginDto } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    const dto: LoginDto = {
      Correo: this.correo,
      password: this.password
    };

    this.authService.login(dto).subscribe({
      next: (res: any) => {
        // Guarda el token en localStorage
        localStorage.setItem('token', res.token);

        // Obtén el rol desde el token usando el método del servicio
        const rol = this.authService.getRol();

        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido de nuevo',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Redirige según el rol
          if (rol?.toLowerCase() === 'administrador') {
            this.router.navigate(['/admin/materia-prima']);
          } else if (rol?.toLowerCase() === 'cliente') {
            this.router.navigate(['/cliente/inicio']);
          } else {
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo o contraseña inválidos'
        });
      }
    });
  }

}
