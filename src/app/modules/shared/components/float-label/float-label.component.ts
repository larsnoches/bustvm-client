import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-shared-float-label',
  templateUrl: './float-label.component.html',
  styleUrls: ['./float-label.component.scss'],
})
export class FloatLabelComponent implements AfterViewInit {
  @ViewChild('floatLabelTemplate') floatLabelTemplate: TemplateRef<any>;

  @Input() isNotValid?: boolean;
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

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit(): void {
    this.viewContainerRef.createEmbeddedView(this.floatLabelTemplate);
  }
}
