import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buspoint-type-form',
  templateUrl: './buspoint-type-form.component.html',
  styleUrls: ['./buspoint-type-form.component.scss'],
})
export class BusPointTypeFormComponent implements OnInit {
  // name_: string;
  loading$: Observable<boolean>;
  busPointTypeForm: FormGroup;

  constructor(private busPointTypeStoreService: BusPointTypeStoreService) {
    this.loading$ = busPointTypeStoreService.loading.value$;
  }

  get name() {
    return this.busPointTypeForm.get('name');
  }

  ngOnInit(): void {
    // this.name_ = '';
    this.busPointTypeForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]*$'),
      ]),
    });
  }

  createBusPointType() {
    this.busPointTypeStoreService.create({
      name: this.name.value,
    });
  }
}
