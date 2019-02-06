import { Injectable } from '@angular/core';
import { User } from '../users/models/User';
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    private user: User;

	constructor(private http: HttpClient, private router: Router) { }

    get User(): User {
        return this.user;
    }

    loadUser(userName: string, password: string): void {
        this.user = {
            userName: 'userName',
            email: 'email@gmail.com',
            firstName: 'firstName',
            lastName: 'lastName',
            password: 'password',
            birthdate: 'birthdate',
            isAdmin: true
        };
	}

	AddUser(userName: string, email: string, firstName: string, lastName: string, password: string): void {

		var userToSend = {
			userName: userName,
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
			birthdate: '1/1/2000',
			isAdmin: true
		};

		this.http
			.post<{ message: string; user: User }>(
				"http://localhost:3000/api/users",
				 userToSend
			)
			.subscribe(responseData => {
				this.router.navigate(["/"]);
			});
	}
}
