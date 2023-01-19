import { Injectable, Injector } from '@angular/core';
import {
  BasicBusPointRequestDto as T,
  GetBusPointResponseDto as U,
} from '@modules/buspoints/models/buspoint.model';
import { StoreService } from '@helpers/store.service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class BusPointStoreService extends StoreService<T, U> {
  constructor(protected injector: Injector) {
    super(injector);
    super.apiUrl = `${config.apiPath}/busPoints`;
  }
}
