import { BusPoint } from '@modules/buspoints/models/buspoint.model';

export interface BusPointType {
  id: number;
  name: string;
  busPoints: Array<BusPoint>;
}
