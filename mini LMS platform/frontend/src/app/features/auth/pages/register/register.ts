import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterForm } from '../../components/register/register';

@Component({
  selector: 'app-register',
  imports: [RegisterForm, RouterLink],
  templateUrl: './register.html',
})
export class Register {}
