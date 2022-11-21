import { Bus } from '@modules/buses/models/bus.model';
import { Fare } from '@modules/fares/models/fare.model';
import { PageData } from '@helpers/page-data';

/**
 * Перевозчик
 */

export interface Carrier {
  id: number;
  name: string;
  inn: string;
  address: string;
  href: string;
  buses?: Array<Bus> | string; // or href
  fares?: Array<Fare> | string; // or href
}

export interface CarrierRequestDto {
  name: string;
  inn: string;
  address: string;
}

export interface CarrierResponseDto {
  id: number;
  name: string;
  inn: string;
  address: string;
  _links?: {
    self: {
      href: string;
    };
    carrier?: {
      href: string;
    };
    fares?: {
      href: string;
    };
    buses?: {
      href: string;
    };
  };
}

export interface CarriersResponseDto {
  _embedded: {
    carriers: Array<CarrierResponseDto>;
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

// export interface CarrierByBusResponseDto {
//   id: number;
//   name: string;
//   inn: string;
//   address: string;
//   _links?: {
//     self: {
//       href: string;
//     };
//     carrier: {
//       href: string;
//     };
//     fares: {
//       href: string;
//     };
//     buses: {
//       href: string;
//     };
//   };
// }

// export interface CarrierByFareResponseDto {
//   id: number;
//   name: string;
//   inn: string;
//   address: string;
//   _links?: {
//     self: {
//       href: string;
//     };
//     carrier: {
//       href: string;
//     };
//     fares: {
//       href: string;
//     };
//     buses: {
//       href: string;
//     };
//   };
// }

export type CarriersWithPage = {
  carriers?: Array<Carrier>;
  page?: PageData;
};

export type CarrierWithPage = {
  carrier: Carrier;
  page?: PageData;
};
