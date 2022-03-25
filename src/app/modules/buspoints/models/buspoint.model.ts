import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { PageData } from '@helpers/page-data';

export interface BusPoint {
  id: number;
  name: string;
  address: string;
  busPointType?: BusPointType;
  href: string;
  departureBusTrips?: Array<BusTrip>;
  arrivalBusTrips?: Array<BusTrip>;
}

export interface BusPointRequestDto {
  name: string;
  address: string;
  busPointType: string;
}

export interface BusPointResponseDto {
  id: number;
  name: string;
  address: string;
  _links?: {
    self: {
      href: string;
    };
    busPoint?: {
      href: string;
    };
    departureBusTrips?: {
      href: string;
    };
    arrivalBusTrips?: {
      href: string;
    };
    busPointType?: {
      href: string;
    };
  };
}

export interface BusPointsResponseDto {
  _embedded: {
    busPoints: Array<BusPointResponseDto>;
  };
  _links?: {
    self: {
      href: string;
    };
    profile: {
      href: string;
    };
  };
  page?: PageData;
}
