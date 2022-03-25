import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { PageData } from '@helpers/page-data';

export interface BusPointType {
  id: number;
  name: string;
  href: string;
  busPoints?: Array<BusPoint>;
}

export interface BusPointTypeRequestDto {
  name: string;
}

export interface BusPointTypeResponseDto {
  id: number;
  name: string;
  _links?: {
    self: {
      href: string;
    };
    busPointType?: {
      href: string;
    };
    busPoints?: {
      href: string;
    };
  };
}

export interface BusPointTypesResponseDto {
  _embedded: {
    busPointTypes: Array<BusPointTypeResponseDto>;
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
