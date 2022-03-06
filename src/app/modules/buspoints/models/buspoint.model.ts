import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';

export interface BusPoint {
  id: number;
  name: string;
  address: string;
  busPointType: BusPointType;
  departureBusTrips: Array<BusTrip>;
  arrivalBusTrips: Array<BusTrip>;
}
