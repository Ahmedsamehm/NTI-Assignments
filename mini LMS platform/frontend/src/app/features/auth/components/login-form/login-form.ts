import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/login-request';
import { Response_login } from '../../interfaces/Response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, HlmButtonImports],
  templateUrl: './login-form.html',
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  loginForm = new FormGroup({
    email: new FormControl('test@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: ({ message }: Response_login) => {
          console.log(message);

          const msg = message || 'Login successful!';
          this.successMessage.set(msg);
          this.errorMessage.set('');
        },
        error: (err) => {
          // 3. Set the signal value
          const msg = err.error?.message || 'An error occurred.';
          this.errorMessage.set(msg);
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
      });
    }
  }
}
