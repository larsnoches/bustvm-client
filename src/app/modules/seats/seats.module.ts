import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SeatsItemComponent } from './components/seats-item/seats-item/seats-item.component';
import { SeatsListComponent } from './components/seats-list/seats-list/seats-list.component';

@NgModule({
  declarations: [SeatsListComponent, SeatsItemComponent],
  imports: [CommonModule],
})
export class SeatsModule {}
