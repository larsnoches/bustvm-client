import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RedirectPageComponent } from './redirect-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RedirectPageComponent', () => {
  let component: RedirectPageComponent;
  let fixture: ComponentFixture<RedirectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedirectPageComponent],
      imports: [
        HttpClientTestingModule,
        OAuthModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
