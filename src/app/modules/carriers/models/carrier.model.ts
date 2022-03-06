import { Bus } from '@modules/buses/models/bus.model';
import { Fare } from '@modules/fares/models/fare.model';

export interface Carrier {
  id: number;
  name: string;
  inn: string;
  address: string;
  buses: Array<Bus>;
  fares: Array<Fare>;
}
