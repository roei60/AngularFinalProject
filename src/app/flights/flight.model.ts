import { Destination } from '../destinations/destination.model';

export interface Flight {
    Id: Number,
    takeoff: String, 
    landing: String,
    price: Number, 
    destination: Destination
}
