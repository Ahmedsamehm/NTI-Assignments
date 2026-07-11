import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  
}
