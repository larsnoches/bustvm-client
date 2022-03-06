import { Seat } from '@modules/seats/models/seat.model';

export interface SeatState {
  id: number;
  name: string;
  seats: Array<Seat>;
}
