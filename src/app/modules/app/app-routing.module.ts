import * as coreComponents from '@modules/core/components';
import {
  BusPointFormPageComponent,
  BusPointsPageComponent,
} from '@modules/buspoints/components';
import {
  CarrierFormPageComponent,
  CarriersPageComponent,
} from '@modules/carriers/components';
import { RouterModule, Routes } from '@angular/router';
import {
  UserFormPageComponent,
  UsersPageComponent,
} from '@modules/users/components';
import { AuthGuard } from '@modules/core/guards/auth/auth.guard';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
import { EmailGuard } from '@modules/core/guards/email/email.guard';
import { NgModule } from '@angular/core';
import { RoleGuard } from '@modules/core/guards/role/role.guard';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/self/:email',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, EmailGuard],
  },
];

const buspointRoutes: Routes = [
  {
    path: '',
    component: BusPointsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form',
    component: BusPointFormPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form/:id',
    component: BusPointFormPageComponent,
    canActivate: [AuthGuard],
  },
];

const carrierRoutes: Routes = [
  {
    path: '',
    component: CarriersPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: CarrierFormPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form/:id',
    component: CarrierFormPageComponent,
    canActivate: [AuthGuard],
  },
];

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
    // component: BusPointsPageComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: buspointRoutes,
  },
  {
    path: 'carriers',
    children: carrierRoutes,
  },
  {
    path: 'users',
    children: userRoutes,
  },
  {
    path: 'login',
    component: coreComponents.LoginPageComponent,
  },
  {
    path: 'logout',
    component: coreComponents.LogoutPageComponent,
  },
  {
    path: 'register',
    component: coreComponents.RegisterPageComponent,
  },
  // {
  //   path: 'callback',
  //   component: coreComponents.RedirectPageComponent,
  // },
  {
    path: '**',
    component: coreComponents.NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
