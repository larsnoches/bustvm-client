import { Bus } from '@modules/buses/models/bus.model';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { Fare } from '@modules/fares/models/fare.model';
import { Seat } from '@modules/seats/models/seat.model';
import { Ticket } from '@modules/tickets/models/ticket.model';

export interface BusTrip {
  id: number;
  departureBusPoint: BusPoint;
  arrivalBusPoint: BusPoint;
  distance: number;
  busRouteNumber: string;
  departureDateTime: Date;
  averageBusSpeed: number;
  bus: Bus;
  fare: Fare;
  seats: Array<Seat>;
  tickets: Array<Ticket>;
}
