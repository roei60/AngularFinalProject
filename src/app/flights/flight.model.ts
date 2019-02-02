import { Destination } from '../destinations/destination.model';

export interface Flight {
    id: String,
    takeoff: String, 
    landing: String,
    price: Number, 
    destination: Destination
}
