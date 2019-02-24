import { Component, OnInit, Input } from '@angular/core';
import { CMSService } from 'src/app/services/cms.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Destination } from 'src/app/models/destination.model';
import { DestinationService } from 'src/app/services/destination.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-best-offer',
  templateUrl: './best-offer.component.html',
  styleUrls: ['./best-offer.component.css']
})
export class BestOfferComponent implements OnInit {
  bestOfferForm: FormGroup;
  public DestinationValue : string;

  constructor(private fb: FormBuilder,private router: Router,private cmsService: CMSService,public destinationService: DestinationService,public flightService: FlightService) { }

  ngOnInit() {
    if (this.router.url== "/bestOffer") {
      setTimeout(() => {
        this.cmsService.getDestination()
          .subscribe(dest => {
            this.DestinationValue = JSON.stringify(dest);
          })});
        };
      }
  
      onSubmit() {
        var countryVal = ((JSON.stringify(this.DestinationValue).split(',')[1].trim()).split(':')[1].trim()).substring(2,(JSON.stringify(this.DestinationValue).split(',')[1].trim()).split(':')[1].trim().length-2) as any;
        var cityVal = ((JSON.stringify(this.DestinationValue).split(',')[2].trim()).split(':')[1].trim()).substring(2,(JSON.stringify(this.DestinationValue).split(',')[1].trim()).split(':')[1].trim().length-3) as any;
        /*var takeoff = this.SearchFligthGroup.value.takeoff
        var price = this.SearchFligthGroup.value.price*/
        this.destinationService.getDestinationIdByCountryAndCity(countryVal, cityVal)
        .subscribe(dest => {
          //console.log("dest.id from query = " + dest._id);
          this.cmsService.setSerchInformation(dest as any);
    
            var searchParams = {
              destination: dest._id
            }
            this.flightService.searchFlightsByCountryAndCity(searchParams)
            this.router.navigate(["/search"]);
    
          })
        }

}
