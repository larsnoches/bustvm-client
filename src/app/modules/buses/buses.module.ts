import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusesListComponent } from './components/buses-list/buses-list/buses-list.component';
import { BusesItemComponent } from './components/buses-item/buses-item/buses-item.component';

@NgModule({
  declarations: [BusesListComponent, BusesItemComponent],
  imports: [CommonModule],
})
export class BusesModule {}
