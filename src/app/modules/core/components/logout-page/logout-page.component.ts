import { AuthService } from '@modules/core/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent {
  constructor(private authService: AuthService) {
    // this.authService.logout();
  }
}
