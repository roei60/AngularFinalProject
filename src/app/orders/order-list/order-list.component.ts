import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import { UserService } from 'src/app/services/user.service';
import { FlightService } from 'src/app/services/flight.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  isLoading: boolean;
  dataSource;
  displayedColumns = ['Destination', 'takeoff', 'landing', 'price', "quantity"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  flights: any[] = []
  orders: any[] = []
  private ordersSubscriber: Subscription;
  constructor(private flightService: FlightService,  private orderService: OrderService, 
    private userService: UserService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("shit");
     this.orderService.getOrders(this.authService.userDetails.userId)


     this.ordersSubscriber = this.orderService.getOrdersUpdateListener()      
     .subscribe(ordersData => {
         this.orders = ordersData.ordersData;
         console.log(this.orders);
         this.DataSourceHandling();
       });
     console.log("fuckkk");
     
  }
  
  DataSourceHandling() {
    
    this.dataSource = new MatTableDataSource(this.orders);    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Destination': return item.destination.country
        default: return item[property];
      }
    };
  }
}
