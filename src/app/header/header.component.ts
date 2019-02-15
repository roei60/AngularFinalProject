import { Component, OnInit } from '@angular/core';
import { CartService } from "../services/cart.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ {provide: Number}]
})
export class HeaderComponent implements OnInit {

  private _subscription: any;

  constructor(private cartService: CartService, private numItems: Number, private authService:AuthService) {
    this.numItems = cartService.numItems; 
    this._subscription = cartService.cartChange.subscribe((value) => { 
      this.numItems = value; 
    });
    this.getCartNumFromService();
  }

  ngOnInit() {
  }

  getCartNumFromService(){
    this.numItems = this.cartService.getCart().items.length;
    console.log("dsadsadsadsadsadsadasdsa " + this.numItems);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe();
   }
}
