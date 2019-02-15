import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { stringify } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  public getOrders() 
  {
    return this.http.get<{ message: string; orders: any; maxOrders: number }>("http://localhost:3000/api/orders")
    .pipe(
      map(orderData => {
         return {
           orders: orderData.orders.map(order => {
             return {
                id: order._id,
                quantity: order.quantity,
                flight: order.flight
             };
           }),
           maxDestinations: orderData.maxOrders
         };
       })
     )
  }

  // getOrder(id: string) {
  //   return this.http.get<{
  //     _id: string;
  //     city: string;
  //     country: string;
  //   }>("http://localhost:3000/api/orders/" + id);
  // }

  addOrder(userId: string, flightId: string, quantity: number) {
    console.log("Add order: ");
    console.log("userId: " + userId);
    console.log("flightId: " + flightId);
    console.log("quantity: " + quantity);

    var order = {
      userId: userId,
      flightId: flightId,
      quantity: quantity
    }

    this.http
      .put<{ message: string; order: Order }>(
        "http://localhost:3000/api/orders",
        order
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }
}
