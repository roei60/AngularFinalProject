import { Injectable } from '@angular/core';
import { Flight } from './flight.model';
import { HttpClient, HttpHeaders,} from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: Flight[] = []
  private flightsUpdated = new Subject<{ flightsData: Flight[]}>();
  constructor(private http: HttpClient, private router: Router) {
    var f: Flight
    f = {
      id: "1234",
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

   public GetFlights()
   {
     return this.flights;
   }
  // public GetFlights(flightsPerPage: number, currentPage: number) {
  //   const queryParams = `?pagesize=${flightsPerPage}&page=${currentPage}`;
  //   this.http
  //     .get<{ message: string; flights: any; maxFlights: number }>(
  //       "http://localhost:3000/api/flights" + queryParams
  //     )
  //     .pipe(
  //       map(flightData => {
  //         return {
  //           flights: flightData.flights.map(flight => {
  //             return {
  //               takeoff: flight.takeoff,
  //               landing: flight.landing,
  //               id: flight._id,
  //               price: flight.price,
  //               destination: flight.destination
  //             };
  //           }),
  //           maxFlights: flightData.maxFlights
  //         };
  //       })
  //     )
  //     .subscribe(transformedFlightData => {
  //       this.flights = transformedFlightData.flights;
  //       this.flightsUpdated.next({
  //         flightsData: [...this.flights],
  //         flightCount: transformedFlightData.maxFlights
  //       });
  //     });
  // }
  getFlightsUpdateListener() {
    return this.flightsUpdated.asObservable();
  }

  getFlight(id: string) {
    return this.http.get<{
      _id: string;
      takeoff: string;
      landing: string;
      price: string;
      destination: string
    }>("http://localhost:3000/api/flights/" + id);
  }

  addFlight(takeoff: string, landing: string, price: number, destination: string){
    console.log("Add flight: ");
    console.log("takeoff: " + takeoff);
    console.log("landing: " + landing);
    console.log("price: " + price);
    console.log("destination: " + destination);

    // var city = destination.split(',')[0].trim();
    // var country = destination.split(',')[1].trim();

    var f = {
      // destination: {
      //   City: city,
      //   Country: country
      // },
      destination: destination,
      landing: landing,
      price: price,
      takeoff: takeoff
    }
       
    this.http
      .post<{ message: string; flight: Flight}>(
        "http://localhost:3000/api/flights",
        f
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateFlight(id: string, takeoff: string, landing: string, price: string, destination: string) {
    console.log("Update flight: ");
    console.log("id: " + id);
    console.log("takeoff: " + takeoff);
    console.log("landing: " + landing);
    console.log("price: " + price);
    console.log("destination: " + destination);

    let flightData: Flight | FormData;

      flightData = new FormData();
      flightData.append("id", id);
      flightData.append("takeoff", takeoff);
      flightData.append("landing", landing);
      flightData.append("price", price);
      flightData.append("destination", destination);

    this.http
      .put("http://localhost:3000/api/flights/" + id, flightData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteNote(flightId: string) {
    return this.http
      .delete("http://localhost:3000/api/flights/" + flightId);
  }
}