import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Destination } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destinations = [];
  constructor(private http: HttpClient, private router: Router) {
    this.destinations = this.GetDestinations();
   }

  public GetDestinations() : Destination[]
  {
    this.http.get<{ message: string; destinations: any; maxDestinations: number }>("http://localhost:3000/api/destinations")
    .pipe(
      map(destinationData => {
         return {
           destinations: destinationData.destinations.map(dest => {
             return {
                id: dest._id,
                Country: dest.Country,
                City: dest.City
             };
           }),
           maxDestinations: destinationData.maxDestinations
         };
       })
     )
     .subscribe(transformedDestinationData => {
       this.destinations = transformedDestinationData.destinations; 
     });
     console.log(this.destinations);
     return this.destinations;
  }

 getDestination(id: string) {
   return this.http.get<{
     _id: string;
     city: string;
     country: string;
   }>("http://localhost:3000/api/destinations/" + id);
 }
}