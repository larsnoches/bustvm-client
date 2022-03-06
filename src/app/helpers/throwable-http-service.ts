import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ThrowableService {
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        () => new Error(`Client error. ${JSON.stringify(error.error)}`),
      );
    }
    return throwError(
      () =>
        new Error(
          `Server error ${error.status}. ${JSON.stringify(error.error)}`,
        ),
    );
  }
}
