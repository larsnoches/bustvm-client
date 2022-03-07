import { BusPoint } from '@modules/buspoints/models/buspoint.model';

export interface BusPointType {
  id: number;
  name: string;
  busPoints: Array<BusPoint>;
}

export interface BusPointTypeRequestDto {
  name: string;
}

export interface BusPointTypeResponseDto {
  id: number;
  name: string;
  _links: {
    self: {
      href: string;
    };
    busPointType: {
      href: string;
    };
  };
}
