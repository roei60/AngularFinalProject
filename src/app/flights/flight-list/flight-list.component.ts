import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightService } from '../flight.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights: Flight[]
  private flightsSubscriber: Subscription;

  constructor(private FlightService: FlightService) { }

  ngOnInit() {

    this.flights = this.FlightService.GetFlights()

    this.flightsSubscriber = this.FlightService.getFlightsUpdateListener()
      .subscribe(flightData=>{
        this.flights=flightData.flightsData;
      })
  }
}


