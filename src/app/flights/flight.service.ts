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
  private flightsUpdates = new Subject<{ flightsData: Flight[] }>();
  constructor(private http: HttpClient, private router: Router) {
    var f: Flight
    f = {
      Id: 1234,
      destination: {
        City: "Jeruslam",
        Country: "Israel",
        Id: 12345
      },
      landing: "12/12/12",
      price: 1234,
      takeoff: "30/12/12"
    }
    for (var i = 0; i < 100; i++) {
      let copy = JSON.parse(JSON.stringify(f))
      copy.destination.City=f.destination.City+i;
     copy.price=i;
      this.flights.push(copy);
  
    }
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

  public AddFlight(takeoff: string, landing: string, price: number, destination: string){
    console.log("Add flight: ");
    console.log("/ttakeoff: " + takeoff);
    console.log("/tlanding: " + landing);
    console.log("/tprice: " + price);
    console.log("/tdestination: " + destination);
  }

  public UpdateFlight(id: string, takeoff: string, landing: string, price: number, destination: string){
    console.log("Update flight: ");
    console.log("/tid: " + id);
    console.log("/ttakeoff: " + takeoff);
    console.log("/tlanding: " + landing);
    console.log("/tprice: " + price);
    console.log("/tdestination: " + destination);
  }

}