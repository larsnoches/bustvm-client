import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointsListComponent } from './buspoints-list.component';

describe('BuspointsListComponent', () => {
  let component: BuspointsListComponent;
  let fixture: ComponentFixture<BuspointsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuspointsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
