import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CarrierConfirmComponent } from '../carrier-confirm/carrier-confirm.component';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { Component } from '@angular/core';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-carriers-page',
  templateUrl: './carriers-page.component.html',
  styleUrls: ['./carriers-page.component.scss'],
})
export class CarriersPageComponent {
  bsModalRef?: BsModalRef;
  pageData$: Observable<PageData>;

  constructor(
    private modalService: BsModalService,
    private carrierService: CarrierStoreService,
  ) {
    this.pageData$ = carrierService.pageData.value$;
  }

  onDeleteItemBtnClick(carrier: GetCarrierResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        carrier,
      },
    };
    this.bsModalRef = this.modalService.show(
      CarrierConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.carrierService.pageData.value.number + 1;
    this.carrierService.getList(pageNumber);
  }
}
