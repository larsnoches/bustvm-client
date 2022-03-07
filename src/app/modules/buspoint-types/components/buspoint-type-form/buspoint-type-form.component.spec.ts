import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointTypeFormComponent } from './buspoint-type-form.component';

describe('BuspointTypeFormComponent', () => {
  let component: BuspointTypeFormComponent;
  let fixture: ComponentFixture<BuspointTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspointTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
