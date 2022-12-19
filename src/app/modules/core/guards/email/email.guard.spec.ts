import { EmailGuard } from './email.guard';
import { TestBed } from '@angular/core/testing';

describe('EmailGuard', () => {
  let guard: EmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
