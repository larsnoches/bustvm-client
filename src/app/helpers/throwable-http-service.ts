import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ThrowableService {
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        () => new Error('Произошла ошибка на стороне клиента.'),
      );
    }
    return throwError(() => {
      if (error.status === 403) {
        return Error('Ошибка в процессе аутентификации.');
      }
      return new Error(
        `Произошла ошибка на стороне сервера (${error.status}).`,
      );
    });
  }
}
