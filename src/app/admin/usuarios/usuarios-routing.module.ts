import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../../users/user-list/user-list.component';
import { UserFormComponent } from '../../users/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'nuevo', component: UserFormComponent },
  { path: 'editar/:id', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
