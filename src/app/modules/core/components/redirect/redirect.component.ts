import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  ngOnInit(): void {
    this.authService.redirectOnCallback();
  }

  constructor(private authService: AuthService) {}
}
