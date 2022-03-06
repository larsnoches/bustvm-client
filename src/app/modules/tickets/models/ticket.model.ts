import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';

export interface Ticket {
  id: number;
  issueDateTime: Date;
  passengerLastname: string;
  passengerFirstname: string;
  passengerMiddlename: string;
  busRouteNumber: string;
  qrCode: string;
  seatName: string;
  carrierName: string;
  departureBuspointName: string;
  arrivalBuspointName: string;
  departureDateTime: Date;
  arrivalDatetime: Date;
  price: number;
  busTrip: BusTrip;
  userId: string;
}
