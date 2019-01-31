import { Injectable } from '@angular/core';
import { Flight } from './flight.model';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: Flight[] = []
  private flightsUpdates = new Subject<{ flightsData: Flight[]}>();
  constructor(private http: HttpClient, private router: Router) {
    var f: Flight
    f = {
      Id: 1234,
      destination: {
        City: "Jeruslam",
        Country: "Israel",
        Id: 12345
      },
      landing:"12/12/12",
      price:1234,
      takeoff:"30/12/12"
    }

    this.flights.push(f);
    this.flights.push(f);
  }
  /**
   * name
   */
  public GetFlights() {
    return this.flights
  }
  getFlightsUpdateListener() {
    return this.flightsUpdates.asObservable();
  }

}