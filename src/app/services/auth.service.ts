import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { User } from '../models/User';
import { to } from 'await-to-js';


@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private nextUrl: string;

  userDetails = {
    firstName: null,
    lastName: null,
    email: null
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient) {
      
    this.nextUrl = '/get';
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
      // this.userAuthenticated.emit({ userDetails: response.userDetails });
      this.saveUserDetails(response.firstname,
        response.lastname, response.email);
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

  // Test(username: string, password: string): Promise<LoginResponse> {

  //   const url = 'http://localhost:3000/api/add-flight-test';
  //   // const url = this.authAPI + '/admin/login';

  //   const body = {
  //     username: username,
  //     password: password,
  //   };

  //   let err, response: LoginResponse;
  //   return this.http.post<LoginResponse>(url, body).toPromise();

  // }

  // async Test2() {
  //   let err, response: LoginResponse;
  //   [err, response] = await to(this.Test("aaa","ssss"));
  // }

  // async login2(username:string, password:string): void {
  //   this.userService.loadUser(username,password);
  //   this.isLoggedIn = true;

  //   const userToSend = {
	// 		userName: username,
	// 		password: password,
	// 	};

  //   const url = "http://localhost:3000/api/users/login";
  // await to(this.http.post<{ message: string, token:string; user: User }>(url,({username: userName, password: password})))
	// 	this.http
	// 		.post<{ message: string, token:string; user: User }>(
	// 			"http://localhost:3000/api/users/login",
	// 			({username: userName, password: password}),
	// 		)
	// 		.subscribe(responseData => {
	// 			this.token = responseData.token;
	// 			console.log("token:" + this.token)
	// 			this.router.navigate(["/"]);
	// 		});

  //   this.nextUrl = '/home';
  //   this.navigateNext();
  // }`

  logout(): void {
    this.isLoggedIn = false;
    this.nextUrl = '/home';

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

  saveUserDetails(firstName: string, lastName: string, email: string) {
    this.userDetails.firstName = firstName;
    this.userDetails.lastName = lastName;
    this.userDetails.email = email;
  }

  getUserDetails() {
    return this.userDetails;
  }


}
interface LoginResponse {
  message: string;
  accessToken: string;
  firstname: string;
  lastname: string;
  email: string;
}
