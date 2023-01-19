import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'secure',
})
export class SecurePipe implements PipeTransform {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  transform(url): Observable<SafeUrl> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map(val =>
          this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)),
        ),
      );
  }
}
