import { BusTrip } from '@modules/bustrips/models/bustrip.model';
import { SeatState } from '@modules/seat-states/models/seat-state.model';

export interface Seat {
  id: number;
  name: string;
  seatState: SeatState;
  busTrip: BusTrip;
}
