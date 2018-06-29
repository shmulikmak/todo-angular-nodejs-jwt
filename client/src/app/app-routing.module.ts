import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginPageComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'todos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
