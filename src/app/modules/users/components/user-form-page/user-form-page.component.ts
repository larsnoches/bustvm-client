import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { GetUserResponseDto } from '@modules/users/models/user.model';
import { UserStoreService } from '@modules/users/services/user/user-store.service';
import { config } from '@helpers/config';

@Component({
  selector: 'app-user-form-page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.scss'],
})
export class UserFormPageComponent implements OnInit {
  userForm: FormGroup;
  user?: GetUserResponseDto;

  formId = 'userForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserStoreService,
    private authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      lastname: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      firstname: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      middlename: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      isEnabled: new FormControl(true),
      isManager: new FormControl(false),
    });
  }

  get email(): AbstractControl {
    return this.userForm?.get('email') ?? null;
  }

  get lastname(): AbstractControl {
    return this.userForm?.get('lastname') ?? null;
  }

  get firstname(): AbstractControl {
    return this.userForm?.get('firstname') ?? null;
  }

  get middlename(): AbstractControl {
    return this.userForm?.get('middlename') ?? null;
  }

  get isEnabled(): AbstractControl {
    return this.userForm?.get('isEnabled') ?? null;
  }

  get isManager(): AbstractControl {
    return this.userForm?.get('isManager') ?? null;
  }

  get currentUserHasManagerRole(): boolean {
    return this.authService.hasManagerRole();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId != null) {
      const userIdInt = Number.parseInt(userId, 10);
      this.userService.getUserById(userIdInt).subscribe({
        next: this.handleGetUserResponse,
      });
      return;
    }

    const userEmail = this.route.snapshot.paramMap.get('email');
    if (userEmail != null) {
      this.userService.getUserByEmail(userEmail).subscribe({
        next: this.handleGetUserResponse,
      });
    }
  }

  onSubmitUser(): void {
    if (!this.userForm.valid) return;

    const userDto = {
      ...this.userForm?.value,
    };

    if (this.user != null) {
      this.userService.updateUserById(this.user?.id, userDto);
    } else {
      this.userService.createUser({
        ...userDto,
        password: config.defaultPassword,
      });
    }

    this.router.navigate(['users']);
  }

  private handleGetUserResponse = (data: GetUserResponseDto): void => {
    this.user = data;
    this.userForm.setValue({
      email: this.user?.email ?? '',
      lastname: this.user?.lastname ?? '',
      firstname: this.user?.firstname ?? '',
      middlename: this.user?.middlename ?? '',
      isEnabled: this.user?.isEnabled ?? true,
      isManager: this.user?.isManager ?? false,
    });
  };
}
