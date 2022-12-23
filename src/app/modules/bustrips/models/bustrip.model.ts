import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';

export interface BasicBusTripRequestDto {
  departureBusPoint: number;
  arrivalBusPoint: number;
  distance: number;
  busRouteNumber: string;
  departureDate: string;
  departureTime: string;
  averageBusSpeed: number;
  bus: number;
  fare: number;
  carrier: number;
}

export interface GetBusTripResponseDto {
  id: number;
  departureBusPoint: GetBusPointResponseDto;
  arrivalBusPoint: GetBusPointResponseDto;
  distance: number;
  busRouteNumber: string;
  departureDate: string;
  departureTime: string;
  averageBusSpeed: number;
  bus: GetBusResponseDto;
  fare: GetFareResponseDto;
  carrier: GetCarrierResponseDto;
}
