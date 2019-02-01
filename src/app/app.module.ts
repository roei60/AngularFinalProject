import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlightCreateComponent } from './flights/flight-create/flight-create.component';
import { FlightListComponent } from './flights/flight-list/flight-list.component';

import {
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSelectModule
} from "@angular/material";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightCreateComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatTableModule
 
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
