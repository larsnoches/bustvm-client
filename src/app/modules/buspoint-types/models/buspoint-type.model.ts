import {
  BusPoint,
  BusPointResponseDto,
} from '@modules/buspoints/models/buspoint.model';
import { PageData } from '@helpers/page-data';

export interface BusPointType {
  id: number;
  name: string;
  href: string;
  busPoints?: Array<BusPoint> | string; // or href
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

export interface BusPointsByTypeResponseDto {
  _embedded: {
    busPoints: Array<BusPointResponseDto>;
  };
  _links?: {
    self: {
      href: string;
    };
  };
}

export type BusPointTypeWithBusPoints = {
  busPointType?: BusPointType;
  busPointsByTypeResponseDto?: BusPointsByTypeResponseDto;
};

export type BusPointTypeWithBusPointsPage = {
  busPointType?: BusPointType;
  busPointsByTypeResponseDto?: BusPointsByTypeResponseDto;
  page?: PageData;
};
