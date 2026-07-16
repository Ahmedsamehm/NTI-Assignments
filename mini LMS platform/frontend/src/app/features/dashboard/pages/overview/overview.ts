import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard';
import { InstructorDashboardComponent } from '../instructor-dashboard/instructor-dashboard';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, StudentDashboardComponent, InstructorDashboardComponent],
  templateUrl: './overview.html',
})
export class DashboardOverviewComponent implements OnInit {
  protected readonly authService = inject(AuthService);

  ngOnInit() {
    if (!this.authService.user()) {
      this.authService.me().subscribe();
    }
  }
}
