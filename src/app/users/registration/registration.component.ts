import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
	isLoading: boolean;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['',Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)],
      firstName: ['', Validators.pattern(/^[A-Za-z]+$/)],
      lastName: ['', Validators.pattern(/^[A-Za-z]+$/)],
    });

    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;
	 
	this.userService.AddUser(
		this.registrationForm.controls["username"].value,
		this.registrationForm.controls["email"].value,
		this.registrationForm.controls["firstName"].value,
		this.registrationForm.controls["lastName"].value,
		this.registrationForm.controls["password"].value);
    setTimeout(() => this.isLoading = false, 5000);
  }

}
