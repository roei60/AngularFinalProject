import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SearchFligthGroup: FormGroup;
  public selectedDestination = "None";
  destinations: any[];



  onOptionSelected(event: any) {
    this.selectedDestination = event;
  }

  constructor(
    private fb: FormBuilder,
    public flightService: FlightService,
    public destinationService: DestinationService,
    public route: ActivatedRoute) {
    this.destinationService.GetDestinations()
      .subscribe(transformedDestinationData => {
        this.destinations = transformedDestinationData.destinations.map(obj => { return obj.city + ", " + obj.country });
      });
  }

  ngOnInit() {

    this.SearchFligthGroup = this.fb.group({
      takeoff: ['', Validators.required],
      price: ['', Validators.pattern(/^[0-9]*$/)],
      destination: ['', Validators.required]
    });

  }
  onSubmit() {
    var country =this.SearchFligthGroup.value.destination.split(',')[1].trim();
    var city =this.SearchFligthGroup.value.destination.split(',')[0].trim();
    var takeoff = this.SearchFligthGroup.value.takeoff
    var price = this.SearchFligthGroup.value.price
    this.destinationService.getDestinationIdByCountryAndCity(country, city)
    .subscribe(dest => {
      console.log("dest.id from query = " + dest._id);

      var searchParams={
        destination:dest._id,
        takeoff:takeoff,
        price:price
      }
      this.flightService.searchFlights(searchParams)

    }) 
  }
  IsValid() {

    var destination = this.SearchFligthGroup.value.destination
    var takeoff = this.SearchFligthGroup.value.takeoff
    var price = this.SearchFligthGroup.value.price
    if (destination == "None" && takeoff == "" && price == "")
      return false
    return true
  }

}
