import { RouterModule, Routes } from '@angular/router';
import { BusPointTypesModule } from '@modules/buspoint-types/buspoint-types.module';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
import { BusTripsModule } from '@modules/bustrips/bustrips.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'buspoint-types',
    component: BusPointTypesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BusTripsModule, BusPointTypesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
