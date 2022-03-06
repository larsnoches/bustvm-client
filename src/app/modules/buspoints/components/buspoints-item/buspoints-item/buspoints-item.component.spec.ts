import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointsItemComponent } from './buspoints-item.component';

describe('BuspointsItemComponent', () => {
  let component: BuspointsItemComponent;
  let fixture: ComponentFixture<BuspointsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuspointsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
