import { Component, OnInit, ViewChild } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from "../../services/flight.service";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Destination } from 'src/app/models/destination.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  
  dataSource;
  displayedColumns = ['Destination', 'takeoff', 'landing', 'price', "quantity", "actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flights: Flight[] = []
  constructor(private FlightService: FlightService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.DataSourceHandling();
  }
  
  DataSourceHandling() {
    var ids = this.cartService.getCart().items;
    this.flights = this.FlightService.GetFlights().filter(flight => ids.includes(flight.id));
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

  RemoveItem(flight: Flight){
    var cart = this.cartService.getCart();
    console.log("flight.id = " + flight.id);
    var index = cart.items.findIndex(id => id === flight.id);
    console.log("index = " + index);
    cart.items.splice(index, 1);
    this.cartService.setCart(cart);
    this.DataSourceHandling();
  }

}
