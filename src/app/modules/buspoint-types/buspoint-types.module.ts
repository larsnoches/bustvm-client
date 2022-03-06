import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuspointTypesListComponent } from './components/buspoint-types-list/buspoint-types-list/buspoint-types-list.component';
import { BuspointTypesItemComponent } from './components/buspoint-types-item/buspoint-types-item/buspoint-types-item.component';

@NgModule({
  declarations: [BuspointTypesListComponent, BuspointTypesItemComponent],
  imports: [CommonModule],
})
export class BuspointTypesModule {}
