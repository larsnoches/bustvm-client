import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusPointTypeFormComponent } from './components/buspoint-type-form/buspoint-type-form.component';
import { BusPointTypeItemComponent } from './components/buspoint-type-item/buspoint-type-item.component';
import { BusPointTypeListComponent } from './components/buspoint-type-list/buspoint-type-list.component';
import { BusPointTypeStoreService } from './services/buspoint-type-store/buspoint-type-store.service';
import { BusPointTypesPageComponent } from './components/buspoint-types-page/buspoint-types-page.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BusPointTypeListComponent,
    BusPointTypeItemComponent,
    BusPointTypeFormComponent,
    BusPointTypesPageComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [BusPointTypeStoreService],
  exports: [BusPointTypesPageComponent],
})
export class BusPointTypesModule {}
