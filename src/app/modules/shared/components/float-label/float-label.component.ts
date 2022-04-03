import {
  // AfterViewInit,
  Component,
  Input,
  // TemplateRef,
  // ViewChild,
  // ViewContainerRef,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  // selector: 'label[app-shared-float-label]',
  selector: 'app-shared-float-label',
  templateUrl: './float-label.component.html',
  styleUrls: ['./float-label.component.scss'],
})
export class FloatLabelComponent /* implements AfterViewInit*/ {
  // @ViewChild('floatLabelTemplate') floatLabelTemplate: TemplateRef<any>;

  @Input() isNotValid = false;
  @Input() controlPlaceholder = '';
  //
  @Input() hasRequiredError = false;
  @Input() requiredMessage = '';
  //
  @Input() hasMinLengthError = false;
  @Input() minlengthMessage = '';
  //
  @Input() hasMaxLengthError = false;
  @Input() maxlengthMessage = '';
  //
  @Input() hasPatternError = false;
  @Input() patternMessage = '';

  @Input() controlFullLabel = '';

  // constructor(private viewContainerRef: ViewContainerRef) {}

  // ngAfterViewInit(): void {
  //   this.viewContainerRef.createEmbeddedView(this.floatLabelTemplate);
  // }
  getText(): string {
    if (!this.isNotValid) return this.controlFullLabel;

    if (this.hasRequiredError) {
      return this.requiredMessage;
    }
    if (this.hasMinLengthError) {
      return this.minlengthMessage;
    }
    if (this.hasMaxLengthError) {
      return this.maxlengthMessage;
    }
    if (this.hasPatternError) {
      return this.patternMessage;
    }

    return this.controlFullLabel;
  }
}
