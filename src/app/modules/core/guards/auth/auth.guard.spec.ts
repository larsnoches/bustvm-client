import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot(),
        RouterTestingModule,
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
