import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AdminGuard } from '../guards/admin.guard';
import { clienteGuard } from '../guards/cliente.guard';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('../cliente/cliente.module').then(m => m.ClienteModule),
    canActivate: [clienteGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
