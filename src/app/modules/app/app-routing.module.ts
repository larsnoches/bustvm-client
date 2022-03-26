import * as coreComponents from '@modules/core/components';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@modules/core/guards/auth/auth.guard';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
import { BusPointsPageComponent } from '@modules/buspoints/components';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: coreComponents.HomePageComponent,
  },
  {
    path: 'buspoint-types',
    component: BusPointTypesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'buspoints',
    component: BusPointsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: coreComponents.LogoutPageComponent,
  },
  {
    path: 'callback',
    component: coreComponents.RedirectPageComponent,
  },
  {
    path: '**',
    component: coreComponents.NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
