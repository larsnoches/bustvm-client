import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private busTripService: BusTripStoreService) {
    this.busTripService.listData.value.length = 0;
  }
}
