import { CommonModule } from '@angular/common';
import { FaresItemComponent } from './components/fares-item/fares-item/fares-item.component';
import { FaresListComponent } from './components/fares-list/fares-list/fares-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FaresListComponent, FaresItemComponent],
  imports: [CommonModule],
})
export class FaresModule {}
