import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/app/models/destination.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinationService } from 'src/app/services/destination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destination-create',
  templateUrl: './destination-create.component.html',
  styleUrls: ['./destination-create.component.css']
})
export class DestinationCreateComponent implements OnInit {

  destination:Destination;
  destinationForm: FormGroup;
  isLoading: boolean;
  private mode = "create";
  private destinationID: string;
  

  constructor(
    private fb: FormBuilder,
    public destinationService: DestinationService,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("OnInit destination create");

    this.destinationForm = this.fb.group({
      destinationID: ['', Validators.pattern(/^[0-9]*$/)],
      destinationCountry: ['', Validators.pattern(/^[A-Za-z]+$/)],
      destinationCity: ['', Validators.pattern(/^[A-Za-z]+$/)]
    });

    this.isLoading = false;
    this.mode = "create";
  }

  onSubmit(): void {
    this.isLoading = true;
    var destinationID = this.destinationForm.value.destinationID;
    var destinationCountry = this.destinationForm.value.destinationCountry;
    var destinationCity = this.destinationForm.value.destinationCity;

    console.log("mode = " + this.mode);
    if (this.mode === "create") {
      setTimeout(() => {
        this.isLoading = false;
        this.destinationService.getDestinationIdByCountryAndCity(destinationCountry, destinationCity)
          .subscribe(dest => {
            console.log("dest.id from query = " + dest._id);
            this.destinationService.addDestination(this.destinationForm.value.destinationID,
              this.destinationForm.value.destinationCountry,
              this.destinationForm.value.destination
              )
          });;

      }, 3000);
    } else {
      this.destinationService.getDestinationIdByCountryAndCity(destinationCountry, destinationCity)
        .subscribe(dest => {
          console.log("dest.id from query = " + dest._id);

          this.destinationService.updateDestination(
            this.destinationForm.value.destinationID,
            this.destinationForm.value.destinationCountry,
            this.destinationForm.value.destinationCity
          );
        })
    }
  }

}
