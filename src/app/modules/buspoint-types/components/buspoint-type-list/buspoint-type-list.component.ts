import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buspoint-types-list',
  templateUrl: './buspoint-type-list.component.html',
  styleUrls: ['./buspoint-type-list.component.scss'],
})
export class BusPointTypeListComponent {
  busPointTypesData: Observable<Array<BusPointType>>;
  loading$: Observable<boolean>;

  constructor(private busPointTypeStoreService: BusPointTypeStoreService) {
    this.busPointTypesData = busPointTypeStoreService.busPointTypeData.value$;
    this.loading$ = busPointTypeStoreService.loading.value$;
  }


}
