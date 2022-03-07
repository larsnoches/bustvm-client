import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buspoint-type-form',
  templateUrl: './buspoint-type-form.component.html',
  styleUrls: ['./buspoint-type-form.component.scss'],
})
export class BusPointTypeFormComponent {
  name = '';
  loading$: Observable<boolean>;

  constructor(private busPointTypeStoreService: BusPointTypeStoreService) {
    this.loading$ = busPointTypeStoreService.loading.value$;
  }

  createBusPointType() {
    this.busPointTypeStoreService.create({
      name: this.name,
    });
  }
}
