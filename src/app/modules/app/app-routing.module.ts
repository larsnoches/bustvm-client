import { RouterModule, Routes } from '@angular/router';
import { BusPointTypesModule } from '@modules/buspoint-types/buspoint-types.module';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
import { BusTripsModule } from '@modules/bustrips/bustrips.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'buspoint-types',
    component: BusPointTypesPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BusTripsModule, BusPointTypesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
