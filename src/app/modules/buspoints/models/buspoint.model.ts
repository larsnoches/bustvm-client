import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { PageData } from '@helpers/page-data';

export interface BusPoint {
  id: number;
  name: string;
  address: string;
  busPointType?: BusPointType; // or href
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

export interface BusPointTypeByBusPointResponseDto {
  id: number;
  name: string;
  _links?: {
    self: {
      href: string;
    };
    busPointType: {
      href: string;
    };
    busPoints: {
      href: string;
    };
  };
}

export type BusPointsWithPage = {
  busPoints: Array<BusPoint>;
  page?: PageData;
};

export type BusPointWithPage = {
  busPoint: BusPoint;
  page?: PageData;
};

export type EditBusPointType = {
  busPointDto: BusPointRequestDto;
  busPointType: BusPointType;
  busPointHref: string;
};
