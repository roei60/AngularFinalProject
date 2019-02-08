import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { FlightListComponent } from "./flights/flight-list/flight-list.component";
import { FlightCreateComponent } from "./flights/flight-create/flight-create.component";
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  { path: '', component: HomeComponent },
  { path: 'create', component: FlightCreateComponent },
  { path: 'edit/:flightId', component: FlightCreateComponent },
  { path: 'get', component: FlightListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
