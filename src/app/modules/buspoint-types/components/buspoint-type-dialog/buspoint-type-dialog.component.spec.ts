/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusPointTypeDialogComponent } from './buspoint-type-dialog.component';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@modules/shared/shared.module';

describe('BuspointTypeDialogComponent', () => {
  let component: BusPointTypeDialogComponent;
  let fixture: ComponentFixture<BusPointTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypeDialogComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        // ModalModule.forRoot(),
      ],
      providers: [BusPointTypeStoreService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypeDialogComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input 2 letters', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    expect(nameInput).toBeTruthy();

    (nameInput as HTMLInputElement).value = '12';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));

    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Название должно быть не менее 3 символов',
    );
  });

  it('input required', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    expect(nameInput).toBeTruthy();

    (nameInput as HTMLInputElement).value = '';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));

    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Название обязательно',
    );
  });

  it('input pattern error', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    expect(nameInput).toBeTruthy();
  });
  it('space start', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = ' wow123';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
  it('two spaces at start', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = '  wow123';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
  it('two spaces at middle', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = 'wow  123';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
  it('one space at the end', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = 'wow123 ';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
  it('two spaces at the end', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = 'wow123  ';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
  it('! at the end', () => {
    const nameInput = (fixture.nativeElement as HTMLElement).querySelector(
      '#name',
    );
    (nameInput as HTMLInputElement).value = 'wow123!';
    (nameInput as HTMLInputElement).dispatchEvent(new Event('input'));
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      "label[for='name']",
    );
    expect(label).toBeTruthy();
    expect((label as HTMLLabelElement).textContent).toBe(
      'Недопустимые символы',
    );
  });
});
