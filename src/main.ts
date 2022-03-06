import { AppModule } from './app/modules/app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from '@env';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
