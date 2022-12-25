import { Component } from '@angular/core';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';

@Component({
  selector: 'app-bustrip-search-page',
  templateUrl: './bustrip-search-page.component.html',
  styleUrls: ['./bustrip-search-page.component.scss'],
})
export class BusTripSearchPageComponent {
  // constructor() {}

  onOrderItemBtnClick(busTrip: GetBusTripResponseDto): void {
    console.log(busTrip);
  }
}
