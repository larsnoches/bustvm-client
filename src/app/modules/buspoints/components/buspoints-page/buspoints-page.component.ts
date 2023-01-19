import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BusPointConfirmComponent } from '../buspoint-confirm/buspoint-confirm.component';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { Component } from '@angular/core';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buspoints-page',
  templateUrl: './buspoints-page.component.html',
  styleUrls: ['./buspoints-page.component.scss'],
})
export class BusPointsPageComponent {
  bsModalRef?: BsModalRef;
  pageData$: Observable<PageData>;

  constructor(
    private modalService: BsModalService,
    private busPointService: BusPointStoreService,
  ) {
    this.pageData$ = busPointService.pageData.value$;
  }

  onDeleteItemBtnClick(busPoint: GetBusPointResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        busPoint,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusPointConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.busPointService.pageData.value.number + 1;
    this.busPointService.getList(pageNumber);
  }
}
