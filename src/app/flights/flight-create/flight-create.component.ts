import { Component, OnInit } from '@angular/core';
import { mimeType } from "./mime-type.validator";
import { Flight } from '../flight.model';
import { FlightService } from "../flight.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  price : number;
  destination : string;
  takeoff : string;
  landing : string;

  flight: Flight;
  flightForm: FormGroup;
  isLoading: boolean;
  private mode = "create";
  private flightId: string;

  destinations = ["Israel", "England", "Australia"];
  selectedDestination = "None";
  
  onOptionSelected(event: string){
   console.log(event); //option value will be sent as event
   this.selectedDestination = event;
  }

  constructor(
    private fb: FormBuilder,
    public flightService: FlightService,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("OnInit flight create");

    console.log(this.destinations);
    console.log(this.selectedDestination);

    this.flightForm = this.fb.group({
      takeoff: ['', Validators.required],
      landing: ['', Validators.required],
      price: ['', Validators.pattern(/^[0-9]*$/)],
      destination: ['', Validators.required]
      // price: ['', Validators.required, Validators.pattern(/[1-9][0-9]*/)]
    });

    this.isLoading = false;

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("flightId")) {
    //     this.mode = "edit";
    //     this.flightId = paramMap.get("flightId");
    //     this.isLoading = true;
    //     this.flightService.getNote(this.flightId).subscribe(flightData => {
    //       this.isLoading = false;
    //       this.flight = {
    //         Id: flightData._id,
    //         title: noteData.title,
    //         content: noteData.content,
    //         imagePath: noteData.imagePath
    //       };
    //       this.form.setValue({
    //         title: this.note.title,
    //         content: this.note.content,
    //         image: this.note.imagePath
    //       });
    //     });
    //   } else {
    //     this.mode = "create";
    //     this.flightId = null;
    //   }
    // });
  }

  onSubmit(): void {
    this.isLoading = true;
    // var country = this.destination.split(',')[0];
    // var city = this.destination.split(',')[1];
    
    // this.flight = {destination: {Country: country , City: city}}
    if (this.mode === "create") {
    setTimeout(() => {
      this.isLoading = false;
      this.flightService.AddFlight( this.flightForm.value.takeoff,
                                    this.flightForm.value.landing, 
                                    this.flightForm.value.price, 
                                    this.flightForm.value.destination);
    }, 3000);
  } else{
    this.flightService.UpdateFlight(
      this.flightId,
      this.flightForm.value.takeoff,
      this.flightForm.value.landing,
      this.flightForm.value.price,
      this.flightForm.value.destination
    );
  }
  this.flightForm.reset();
  
}

}
