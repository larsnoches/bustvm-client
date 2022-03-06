import { BusTrip } from '@modules/bustrips/models/bustrip/bustrip.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bustrip-list',
  templateUrl: './bustrip-list.component.html',
  styleUrls: ['./bustrip-list.component.scss'],
})
export class BusTripListComponent {
  busTripsData: BusTrip[];
}
