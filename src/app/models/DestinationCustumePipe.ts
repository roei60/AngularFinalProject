import { Pipe, PipeTransform } from '@angular/core';
import { Destination } from './destination.model';

@Pipe({ name: 'DestinationCustumePipe' })
export class DestinationPipeModel implements PipeTransform {
  transform(dest : any) : any {
      console.log("%%%%%%%");
      console.log(dest);
      console.log("%%%%%%%");
    var countryVal = ((JSON.stringify(dest).split(',')[1].trim()).split(':')[1].trim()).substring(2,(JSON.stringify(dest).split(',')[1].trim()).split(':')[1].trim().length-2) as any;
    var cityVal = ((JSON.stringify(dest).split(',')[2].trim()).split(':')[1].trim()).substring(2,(JSON.stringify(dest).split(',')[1].trim()).split(':')[1].trim().length-3) as any;
    return countryVal + ", " + cityVal as any; 
    //return dest.country + ", " + dest.city;
  }
}