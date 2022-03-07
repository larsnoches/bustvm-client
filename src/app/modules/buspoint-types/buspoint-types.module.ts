import { BusPointTypeFormComponent } from './components/buspoint-type-form/buspoint-type-form.component';
import { BusPointTypeItemComponent } from './components/buspoint-type-item/buspoint-type-item.component';
import { BusPointTypeListComponent } from './components/buspoint-type-list/buspoint-type-list.component';
import { BusPointTypeStoreService } from './services/buspoint-type-store/buspoint-type-store.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BusPointTypeListComponent,
    BusPointTypeItemComponent,
    BusPointTypeFormComponent,
  ],
  imports: [CommonModule],
  providers: [BusPointTypeStoreService],
})
export class BuspointTypesModule {}
