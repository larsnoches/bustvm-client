import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buspoint-type-list',
  templateUrl: './buspoint-type-list.component.html',
  styleUrls: ['./buspoint-type-list.component.scss'],
})
export class BusPointTypeListComponent implements OnChanges {
  busPointTypesData$: Observable<Array<BusPointType>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;

  constructor(private storeService: BusPointTypeStoreService) {
    this.busPointTypesData$ = storeService.busPointTypeData.value$;
    this.pageData$ = storeService.pageData.value$;
    this.loading$ = storeService.loading.value$;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log('changes');
  }

  editOne(busPointType: BusPointType): void {
    console.log('edit one', busPointType);
    // this.storeService.deleteOne(busPointType.href);
  }

  deleteOne(busPointType: BusPointType): void {
    console.log('delete one', busPointType);
    // this.storeService.deleteOne(busPointType.href);
  }
}
