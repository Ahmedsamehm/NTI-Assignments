import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [],
  templateUrl: './courses-list.html',
})
export class CoursesListComponent {
  constructor(private authService: AuthService) {
    this.authService.me();
    console.log(this.authService.user());
  }
}
