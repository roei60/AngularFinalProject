import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from "../../services/flight.service";
import { Subscription } from "rxjs";
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Destination } from 'src/app/models/destination.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {


  dataSource;
  displayedColumns = ['Destination', 'takeoff', 'landing', 'price', "actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
       * Pre-defined columns list for user table
       */
  flights: Flight[] = []
  private flightsSubscriber: Subscription;
  constructor(private FlightService: FlightService, private router: Router) { }

  ngOnInit() {
    //   this.dataSource.paginator = this.paginator;
    this.FlightService.GetAllFlights();
    this.flightsSubscriber = this.FlightService.getFlightsUpdateListener()
      .subscribe(flightData => {
        this.flights = flightData.flightsData
        this.DataSourceHandling()

      })


  }
  DataSourceHandling() {
    this.dataSource = new MatTableDataSource(this.flights);
    //  console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Destination': return item.destination.country
        default: return item[property];
      }
    };
  }
  AddToCart(flight: Flight) {
  }
  UpdateItem(flight: Flight) {
    
    this.router.navigate(["/create"]);

  }
  DeleteItem(flight: Flight) {
    this.FlightService.deleteFlight(flight.id);
  }
}




