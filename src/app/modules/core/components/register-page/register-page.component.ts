import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { RegistrationRequestDto } from '@modules/core/models/auth.model';
import { ValidationService } from '@modules/core/services/validation/validation.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  error: string | null = null;
  formId = 'registerForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(68),
          Validators.pattern('^[a-zA-Z0-9._%+-]+$'),
        ]),
        password2: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(68),
          Validators.pattern('^[a-zA-Z0-9._%+-]+$'),
        ]),
      },
      this.validationService.passwordMatch('password', 'password2'),
    );
  }

  get email(): AbstractControl {
    return this.registerForm?.get('email') ?? null;
  }

  get password(): AbstractControl {
    return this.registerForm?.get('password') ?? null;
  }

  get password2(): AbstractControl {
    return this.registerForm?.get('password2') ?? null;
  }

  onSubmitRegister(): void {
    if (!this.registerForm.valid) return;

    const registrationRequestDto: RegistrationRequestDto = {
      ...this.registerForm?.value,
    };
    this.authService.register(registrationRequestDto).subscribe(
      data => {
        console.log(data);
      },
      (er: Error) => {
        console.log(er);
        this.error = er.message;
      },
      () => {
        this.router.navigate(['/login']);
      },
    );
  }
}
