import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RedirectPageComponent } from './redirect-page/redirect-page.component';

export const components: any[] = [
  HeaderComponent,
  HomePageComponent,
  NotFoundPageComponent,
  RedirectPageComponent,
  LogoutPageComponent,
];

export * from './header/header.component';
export * from './home-page/home-page.component';
export * from './not-found-page/not-found-page.component';
export * from './redirect-page/redirect-page.component';
export * from './logout-page/logout-page.component';
