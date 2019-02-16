import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { User } from '../models/User';
import { to } from 'await-to-js';
import { CartService } from './cart.service';


@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private nextUrl: string;

  userDetails = {
    userId:null,
    userName:null,
    firstName: null,
    lastName: null,
    email: null,
    isAdmin:false
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private http: HttpClient) {
      
    this.nextUrl = '/';
    localStorage.clear();
  }


  async login(username: string, password: string) {

    const url = 'http://localhost:3000/api/users/login';
    // const url = this.authAPI + '/admin/login';
    
    const body = {
      username: username,
      password: password,
    };

    let err, response: LoginResponse;
    [err, response] = await to(this.http.post<LoginResponse>(url, body).toPromise());
    if (err || !response) {
      console.log('error = ', err);
      alert('Login failed. Please try again');
      return;
    }

    if (response.accessToken) {
      this.storeToken(response.accessToken);
      this.saveUserDetails(response.userID, response.firstname,
        response.lastname, response.email,response.isAdmin, response.username);
      if (this.redirectUrl) {
        this.nextUrl = this.redirectUrl;
        this.redirectUrl = null;
      }
      this.navigateNext();
    } else {
      alert('Incorrect email or password. Please try again');
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    return token != null;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.nextUrl = '/login';
    localStorage.clear();
    this.cartService.clearCart();
    this.userDetails.isAdmin =false;
    this.navigateNext();
  }

  saveUrl(url: string): void {
    this.nextUrl = url;
  }

  private navigateNext(): void {
    this.router.navigate([this.nextUrl]);
  }

  storeToken(token: string) {
    // store jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('CurrentUser', JSON.stringify({ token: token }));
  }

  getToken() {
    let token = null;
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    if (currentUser) {
      token = currentUser.token;
    }
    return token;
  }

  saveUserDetails(userId:string, firstName: string, lastName: string, email: string, isAdmin:boolean, userName: any) {
    
    console.log(firstName +" " +  lastName + " " +userName );
    this.userDetails.userId = userId;
    this.userDetails.firstName = firstName;
    this.userDetails.lastName = lastName;
    this.userDetails.email = email;
    this.userDetails.isAdmin = isAdmin;
    this.userDetails.userName = userName;
    
  }

  getUserDetails() {
    return this.userDetails;
  }

}
interface LoginResponse {
  message: string;
  accessToken: string;
  userID: string,
  firstname: string;
  lastname: string;
  email: string;
  isAdmin:boolean;
  username: string;
}
