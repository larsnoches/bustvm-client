import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatStatesItemComponent } from './components/seat-states-item/seat-states-item/seat-states-item.component';
import { SeatStatesListComponent } from './components/seat-states-list/seat-states-list/seat-states-list.component';

@NgModule({
  declarations: [SeatStatesListComponent, SeatStatesItemComponent],
  imports: [CommonModule],
})
export class SeatStatesModule {}
