import { AuthService } from '@modules/core/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get currentUserHasManagerRole(): boolean {
    return this.authService.hasManagerRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.hasValidToken();
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
}
