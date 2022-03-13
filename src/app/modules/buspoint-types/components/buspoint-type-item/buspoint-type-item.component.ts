import { Component, Input } from '@angular/core';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';

@Component({
  selector: 'app-buspoint-types-item',
  templateUrl: './buspoint-type-item.component.html',
  styleUrls: ['./buspoint-type-item.component.scss'],
})
export class BusPointTypeItemComponent {
  @Input() busPointType: BusPointType;

  constructor(private storeService: BusPointTypeStoreService) {}

  deleteOne() {
    this.storeService.deleteOne(this.busPointType.href);
  }
}
