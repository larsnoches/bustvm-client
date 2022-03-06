import { BusPointTypeStoreService } from './services/buspoint-type-store/buspoint-type-store.service';
import { BuspointTypesItemComponent } from './components/buspoint-types-item/buspoint-types-item/buspoint-types-item.component';
import { BuspointTypesListComponent } from './components/buspoint-types-list/buspoint-types-list/buspoint-types-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [BuspointTypesListComponent, BuspointTypesItemComponent],
  imports: [CommonModule],
  providers: [BusPointTypeStoreService],
})
export class BuspointTypesModule {}
