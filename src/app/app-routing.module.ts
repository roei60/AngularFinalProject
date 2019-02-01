import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
