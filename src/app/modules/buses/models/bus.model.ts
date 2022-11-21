import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { PageData } from '@helpers/page-data';

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

export interface BusRequestDto {
  makeModel: string;
  manufacturerCountry: string;
  yearOfManufacture: number;
  seatCount: number;
  regNumber: string;
  carrier: string;
}

export interface BusResponseDto {
  id: number;
  makeModel: string;
  manufacturerCountry: string;
  yearOfManufacture: number;
  seatCount: number;
  regNumber: string;
  _links?: {
    self: {
      href: string;
    };
    bus?: {
      href: string;
    };
    carrier?: {
      href: string;
    };
    busTrips?: {
      href: string;
    };
  };
}

export interface BusesResponseDto {
  _embedded: {
    buses: Array<BusResponseDto>;
  };
  _links: {
    self: {
      href: string;
    };
    profile: {
      href: string;
    };
  };
  page?: PageData;
}
