export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'cliente';
  activo: boolean;
}
