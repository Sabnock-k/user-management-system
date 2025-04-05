import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {
  token = '';
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (this.token) {
      this.authService.verifyEmail(this.token).subscribe({
        next: () => {
          this.message = 'Email verified successfully. You can now log in.';
        },
        error: err => {
          this.error = 'Verification failed.';
        }
      });
    } else {
      this.error = 'Invalid verification link.';
    }
  }
}
