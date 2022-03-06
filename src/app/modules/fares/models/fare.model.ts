import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { Carrier } from '@modules/carriers/models/carrier.model';

export interface Fare {
  id: number;
  name: string;
  price: number;
  carrier: Carrier;
  busTrips: Array<BusTrip>;
}
