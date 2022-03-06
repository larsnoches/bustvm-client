import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { Carrier } from '@modules/carriers/models/carrier.model';

export interface Bus {
  id: number;
  makeModel: string;
  manufacturerCountry: string;
  yearOfManufacture: number;
  seatCount: number;
  regNumber: string;
  carrier: Carrier;
  busTrips: Array<BusTrip>;
}
