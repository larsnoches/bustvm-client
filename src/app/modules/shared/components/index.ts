import { ButtonComponent } from './button/button.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DialogComponent } from './dialog/dialog.component';
import { FloatInputComponent } from './float-input/float-input.component';
import { SpinnerComponent } from './spinner/spinner.component';

export const components: any[] = [
  ButtonComponent,
  SpinnerComponent,
  ConfirmComponent,
  DialogComponent,
  FloatInputComponent,
];

export * from './button/button.component';
export * from './dialog/dialog.component';
export * from './spinner/spinner.component';
export * from './confirm/confirm.component';
export * from './float-input/float-input.component';
