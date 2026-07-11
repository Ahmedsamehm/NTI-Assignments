import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/register-request';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, HlmButtonImports],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(``, [Validators.required]),
    },
    { validators: this.matchPassword },
  );

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: () => {
          this.registerForm.reset();
        },
        error: (err) => {},
        complete: () => {
          this.router.navigate(['/login']);
        },
      });
    }
    console.log(this.registerForm.value);
  }
}
