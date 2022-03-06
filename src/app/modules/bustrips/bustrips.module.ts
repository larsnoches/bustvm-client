import { BusTripItemComponent } from './components/bustrip-item/bustrip-item.component';
import { BusTripListComponent } from './components/bustrip-list/bustrip-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [BusTripListComponent, BusTripItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [BusTripListComponent],
})
export class BusTripsModule {}
