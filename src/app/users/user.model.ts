export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  password: string; // <-- mantenemos 'password'
  rol: string;
  telefono: string;
}
