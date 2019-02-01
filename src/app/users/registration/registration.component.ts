import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder) { }

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

    // TODO: Send the info to the server and add it to some DB
    setTimeout(() => this.isLoading = false, 5000);
  }

}
