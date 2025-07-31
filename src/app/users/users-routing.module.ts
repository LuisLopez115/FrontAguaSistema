import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },        // admin/usuarios
  { path: 'nuevo', component: UserFormComponent },    // admin/usuarios/nuevo
  { path: 'editar/:id', component: UserFormComponent } // admin/usuarios/editar/12
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
