import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightService } from '../flight.service';
import { Subscription } from "rxjs";
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Destination } from 'src/app/destinations/destination.model';
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights: Flight[]
  dataSource;
  displayedColumns = ['Destination','takeoff','landing','price',"actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
       * Pre-defined columns list for user table
       */
  
  private flightsSubscriber: Subscription;

  constructor(private FlightService: FlightService) { }

  ngOnInit() {
    //   this.dataSource.paginator = this.paginator;
    this.flights = this.FlightService.GetFlights()
    this.DataSourceHandling()
    this.flightsSubscriber = this.FlightService.getFlightsUpdateListener()
      .subscribe(flightData => {
        this.flights = flightData.flightsData
      })
  }
  DataSourceHandling()
  {
    this.dataSource = new MatTableDataSource(this.flights);
    console.log(this.dataSource.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Destination': return item.destination.Country
        default: return item[property];
      }
    };
  }


}




