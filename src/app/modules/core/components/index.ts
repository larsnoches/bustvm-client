import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RedirectPageComponent } from './redirect-page/redirect-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const components: any[] = [
  HeaderComponent,
  HomePageComponent,
  NotFoundPageComponent,
  RedirectPageComponent,
  LoginPageComponent,
  LogoutPageComponent,
  RegisterPageComponent,
];

export * from './header/header.component';
export * from './home-page/home-page.component';
export * from './not-found-page/not-found-page.component';
export * from './redirect-page/redirect-page.component';
export * from './login-page/login-page.component';
export * from './logout-page/logout-page.component';
export * from './register-page/register-page.component';
