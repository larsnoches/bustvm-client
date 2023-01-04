import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';

export interface BasicTicketRequestDto {
  passengerLastname: string;
  passengerFirstname: string;
  passengerMiddlename: string;
  seatName: string;
  busTrip: number;
  email: string;
}

export interface GetTicketResponseDto {
  id: number;
  issueDateTime: string;
  passengerLastname: string;
  passengerFirstname: string;
  passengerMiddlename: string;
  busRouteNumber: string;
  qrCode: string;
  seatName: string;
  carrierName: string;
  departureBuspointName: string;
  arrivalBuspointName: string;
  departureDateTime: string;
  arrivalDateTime: string;
  price: number;
  status: string;
  busTrip: GetBusTripResponseDto;
  email: string;
}

export interface UpdateTicketStatusAsPayedResponseDto {
  path: string;
}

export interface GetPayedTicketResponseDto {
  id: number;
  issueDateTime: string;
  passengerLastname: string;
  passengerFirstname: string;
  passengerMiddlename: string;
  busRouteNumber: string;
  qrCode: string;
  seatName: string;
  carrierName: string;
  departureBuspointName: string;
  arrivalBuspointName: string;
  departureDateTime: string;
  arrivalDateTime: string;
  price: number;
  status: string;
  busTrip: number;
  email: string;
}
