import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-float-input',
  templateUrl: './float-input.component.html',
  styleUrls: ['./float-input.component.scss'],
})
export class FloatInputComponent {
  @Input() isValid?: boolean;
  @Input() controlName: string;
  @Input() controlPlaceholder: string;
  //
  @Input() hasRequiredError: boolean;
  @Input() requiredMessage: string;
  //
  @Input() hasMinLengthError: boolean;
  @Input() minlengthMessage: string;
  //
  @Input() hasMaxLengthError: boolean;
  @Input() maxlengthMessage: string;
  //
  @Input() hasPatternError: boolean;
  @Input() patternMessage: string;

  @Input() controlFullLabel: string;
}
