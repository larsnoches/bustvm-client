import { BusPointTypeStoreService } from './services/buspoint-type-store/buspoint-type-store.service';
import { BuspointTypesItemComponent } from './components/buspoint-types-item/buspoint-types-item/buspoint-types-item.component';
import { BuspointTypesListComponent } from './components/buspoint-types-list/buspoint-types-list/buspoint-types-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BuspointTypeFormComponent } from './components/buspoint-type-form/buspoint-type-form.component';

@NgModule({
  declarations: [BuspointTypesListComponent, BuspointTypesItemComponent, BuspointTypeFormComponent],
  imports: [CommonModule],
  providers: [BusPointTypeStoreService],
})
export class BuspointTypesModule {}
