import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  error = '';
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.error = 'Passwords do not match or invalid form.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.message = 'Registration successful. Please check your email for verification.';
        this.registerForm.reset();
      },
      error: err => {
        this.error = err.error.message || 'Registration failed';
      }
    });
  }
}
