import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightListComponent } from "./flights/flight-list/flight-list.component";
import { FlightCreateComponent } from "./flights/flight-create/flight-create.component";

const routes: Routes = [
  { path: '', component: FlightListComponent },
  { path: 'create', component: FlightCreateComponent },
  { path: 'edit/:flightId', component: FlightCreateComponent },
  { path: 'read', component: FlightListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
