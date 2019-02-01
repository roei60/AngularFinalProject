import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlightCreateComponent } from './flights/flight-create/flight-create.component';
import { FlightListComponent } from './flights/flight-list/flight-list.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule
} from "@angular/material";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightCreateComponent,
    FlightListComponent,
    RegistrationComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatFormFieldModule,
    MatSelectModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [MatDatepickerModule,AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
