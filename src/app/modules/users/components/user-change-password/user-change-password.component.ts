import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { ChangePasswordRequestDto } from '@modules/core/models/auth.model';
import { GetUserResponseDto } from '@modules/users/models/user.model';
import { UserStoreService } from '@modules/users/services/user/user-store.service';
import { ValidationService } from '@modules/core/services/validation/validation.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  user?: GetUserResponseDto;
  error: string | null = null;

  formId = 'changepasswordForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserStoreService,
    private authService: AuthService,
    private validationService: ValidationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.changePasswordForm = new FormGroup(
      {
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

  get password(): AbstractControl {
    return this.changePasswordForm?.get('password') ?? null;
  }

  get password2(): AbstractControl {
    return this.changePasswordForm?.get('password2') ?? null;
  }

  get currentUserHasManagerRole(): boolean {
    return this.authService.hasManagerRole();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId != null) {
      const userIdInt = Number.parseInt(userId, 10);
      this.userService.getUserById(userIdInt).subscribe({
        next: data => (this.user = data),
      });
      return;
    }

    const userEmail = this.route.snapshot.paramMap.get('email');
    if (userEmail != null) {
      this.userService.getUserByEmail(userEmail).subscribe({
        next: data => (this.user = data),
      });
    }
  }

  onSubmitChangePassword(): void {
    if (!this.changePasswordForm.valid) return;

    const changePasswordRequestDto: ChangePasswordRequestDto = {
      ...this.changePasswordForm?.value,
      email: this.user?.email,
    };

    this.userService
      .changeUserPassword(this.user?.id, changePasswordRequestDto)
      .subscribe({
        complete: () => {
          this.router.navigate(['/users', 'form', this.user?.id]);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
  }
}
