import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';
import { DestinationService } from 'src/app/services/destination.service';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  
})
export class HomeComponent implements OnInit {
  SearchFligthGroup: FormGroup;
  public selectedDestination = "None";
  destinations: any[];
  markers = [];

  public latitude: number;
  public longitude: number;
  public zoom: number;


  onOptionSelected(event: any) {
    this.selectedDestination = event;
  }

  constructor(
    private fb: FormBuilder,
    public flightService: FlightService,
    public destinationService: DestinationService,
    public route: ActivatedRoute, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
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
    var mark=[];
    this.mapsAPILoader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      var mark=[];
      for(let i in this.destinations){
        geocoder.geocode({ 'address': this.destinations[i].split(',')[0] }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var newAddress = results[0].geometry.location;
            mark.push({
              lat: newAddress.lat(),
              long: newAddress.lng()
            })

          }
        });
      }
      console.log(mark)
      this.setCurrentPosition();
      this.markers=mark;
      
    })

  }
  onSubmit() {
    var country = this.SearchFligthGroup.value.destination.split(',')[1].trim();
    var city = this.SearchFligthGroup.value.destination.split(',')[0].trim();
    var takeoff = this.SearchFligthGroup.value.takeoff
    var price = this.SearchFligthGroup.value.price
    this.destinationService.getDestinationIdByCountryAndCity(country, city)
      .subscribe(dest => {
        console.log("dest.id from query = " + dest._id);

        var searchParams = {
          destination: dest._id,
          takeoff: takeoff,
          price: price
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


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        
      });
    }
  }
}
