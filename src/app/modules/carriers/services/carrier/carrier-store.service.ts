import { Injectable, Injector } from '@angular/core';
import {
  BasicCarrierRequestDto as T,
  GetCarrierResponseDto as U,
} from '@modules/carriers/models/carrier.model';
import { StoreService } from '@helpers/store.service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class CarrierStoreService extends StoreService<T, U> {
  constructor(protected injector: Injector) {
    super(injector);
    super.apiUrl = `${config.apiPath}/carriers`;
  }
}
