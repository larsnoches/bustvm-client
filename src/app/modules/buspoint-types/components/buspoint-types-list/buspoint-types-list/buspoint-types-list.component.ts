import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buspoint-types-list',
  templateUrl: './buspoint-types-list.component.html',
  styleUrls: ['./buspoint-types-list.component.scss'],
})
export class BusPointTypesListComponent {
  busPointTypesData: Observable<Array<BusPointType>>;
  loading$: Observable<boolean>;

  constructor(private busPointTypeStoreService: BusPointTypeStoreService) {
    this.busPointTypesData = busPointTypeStoreService.busPointTypeData.value$;
    this.loading$ = busPointTypeStoreService.loading.value$;
  }


}
