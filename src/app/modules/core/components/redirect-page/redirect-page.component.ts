import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss'],
})
export class RedirectPageComponent implements OnInit {
  ngOnInit(): void {
    // this.authService.redirectOnCallback();
  }

  constructor(private authService: AuthService) {}
}
