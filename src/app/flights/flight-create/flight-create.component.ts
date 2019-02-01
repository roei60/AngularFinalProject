import { Component, OnInit } from '@angular/core';
import { mimeType } from "./mime-type.validator";
import { Flight } from '../flight.model';
import { FlightService } from "../flight.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  price : number;
  flight: Flight;
  form: FormGroup;
  private mode = "create";
  private flightId: string;

  destinations = ["Israel", "England", "Australia"];
  selectedDestination: String;
  
  onOptionSelected(event: String){
   console.log(event); //option value will be sent as event
   this.selectedDestination = event;
  }

  constructor(
    public flightService: FlightService,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {
    console.log("in init flight create");
    this.form = new FormGroup({
      price: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern("([1-9][0-9]*)")]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
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

}
