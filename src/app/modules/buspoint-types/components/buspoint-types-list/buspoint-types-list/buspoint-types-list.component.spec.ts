import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointTypesListComponent } from './buspoint-types-list.component';

describe('BuspointTypesListComponent', () => {
  let component: BuspointTypesListComponent;
  let fixture: ComponentFixture<BuspointTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuspointTypesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
