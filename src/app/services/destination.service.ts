import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient, private router: Router) {}

  public GetDestinations() 
  {
    return this.http.get<{ message: string; destinations: any; maxDestinations: number }>("http://localhost:3000/api/destinations")
    .pipe(
      map(destinationData => {
         return {
           destinations: destinationData.destinations.map(dest => {
             return {
                id: dest._id,
                country: dest.Country,
                city: dest.City
             };
           }),
           maxDestinations: destinationData.maxDestinations
         };
       })
     )
  }

 getDestination(id: string) {
   return this.http.get<{
     _id: string;
     city: string;
     country: string;
   }>("http://localhost:3000/api/destinations/" + id);
 }

 public getDestinationIdByCountryAndCity(country: string, city: string) {
   console.log("getDestinationIdByCountryAndCity: " + country +"," + city);
  return this.http.get<{
    _id: string;
     city: string;
     country: string;
  }>("http://localhost:3000/api/destinations/?Country=" + country + "&City=" + city);
}
}