import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [900, 900];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C',
      '#AAAAAA', '#5AA454', '#A10A28',
      '#C7B42C', '#AAAAAA', '#5AA454',
      '#A10A28', '#C7B42C', '#AAAAAA']

  };
  constructor(private FlightService: FlightService) {

  }

  ngOnInit() {
    this.FlightService.GetGraphData().subscribe(receivedData => {
      console.log(receivedData.CountFlight);
      this.single.push(receivedData.CountFlight);
      console.log(this.single);
      Object.assign(this, this.single)

    })


  }

}
