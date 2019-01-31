import { Destination } from '../destinations/destination.model';

export interface Flight {
    Id: Number,
    takeoff: string, 
    landing: string ,
    price: Number, 
    destination: Destination
}
