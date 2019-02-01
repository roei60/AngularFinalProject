import { Destination } from '../destinations/destination.model';

export interface Flight {
    Id: Number,
    Takeoff: String, 
    Landing: String,
    Price: Number, 
    Destination: Destination
}
