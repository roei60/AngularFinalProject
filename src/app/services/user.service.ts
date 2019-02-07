import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient, HttpHeaders, } from "@angular/common/http";
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material';


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
            isAdmin: false
        };
	}

	 AddUser(userName: string, email: string, firstName: string, lastName: string, password: string,birthdate:string): void {

		var userToSend = {
			userName: userName,
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
			birthdate: birthdate,
			isAdmin: false
		};

		//this.http.get("http://localhost:3000/api/users").pipe(user=>)
		this.getUserByUserName(userName)
		.subscribe(user => {
		console.log("user name is : " + user.userName);
		console.log("user is : " + user);
		if(!user)
		{
			this.http
				.post<{ message: string; user: User }>(
					"http://localhost:3000/api/users",
					userToSend
				)
				.subscribe(responseData => {
					this.router.navigate(["/"]);
				});
		}
		else
		{
			
			//this.dialog.openDialog("Error, user name is already registered.");
		}

	});
		
		
	}

	public getUserByUserName(userName: string) {
		console.log("getUserByUserName: " + userName );
	   return this.http.get<{
		_id: string;
		userName: string;
	   }>("http://localhost:3000/api/users/?userName=" + userName);
	 }
}
