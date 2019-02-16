import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { Destination } from 'src/app/models/destination.model';
import { CartService } from 'src/app/services/cart.service';
import { DestinationService } from 'src/app/services/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  dataSource;
  displayedColumns = ['Destination', 'destinationID', 'destinationCountry', 'destinationCity', "actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
       * Pre-defined columns list for user table
       */


  destinations: Destination[] = []
  private destinationsSubscriber: Subscription;


  constructor(
    private DestinationService: DestinationService,
     private cartService: CartService,
      private router: Router) { }

  ngOnInit() {

    if (this.router.url== "/get") {
      //   this.dataSource.paginator = this.paginator;
      this.DestinationService.GetDestinations();
      console.log("get?!");
    }

    this.destinationsSubscriber = this.DestinationService.getDestinationsUpdateListener()
      .subscribe(destinationData => {
        this.destinations = destinationData.destinationsData
        console.log(this.destinations);
        
        this.DataSourceHandling()
      })       
  }

  DataSourceHandling() {
    this.dataSource = [...this.destinations];
    //  console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Destination': return item.destination.country
        default: return item[property];
      }
    };
  }

  AddToCart(destination: Destination) {
    var cart = this.cartService.getCart();
    cart.items.push(destination.id);
    this.cartService.setCart(cart);
    console.log("local cart=" + cart.items.length + " ; storage cart =" + this.cartService.getCart().items.length);
  }
  UpdateItem(destination: Destination) {

    this.router.navigate(["/create"]);

  }
  DeleteItem(destination: Destination) {
    this.DestinationService.deleteDestination(destination.id);
  }

  IsItemInCart(destination: Destination) {
    var flag = false;

    var c = this.cartService.getCart();
    c.items.forEach(element => {
      if (element === destination.id)
        flag = true;
    });
    return flag;
  }

}
