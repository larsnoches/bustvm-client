import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { PageData } from '@helpers/page-data';

export interface Fare {
  id: number;
  name: string;
  price: number;
  carrier: Carrier;
  busTrips: Array<BusTrip>;
}

export interface FareRequestDto {
  name: string;
  price: number;
  carrier: string;
}

export interface FareResponseDto {
  id: number;
  name: string;
  price: number;
  _links: {
    self: {
      href: string;
    };
    fare?: {
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

export interface FaresResponseDto {
  _embedded: {
    fares: Array<Fare>;
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
