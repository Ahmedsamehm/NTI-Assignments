import { Component, signal, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { UsersService } from '../../services/users.service';
import { HlmCardImports } from '../../../../shared/components/ui/card/src';
import { HlmBadgeImports } from '../../../../shared/components/ui/badge/src';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';
import { HlmAvatarImports } from '../../../../shared/components/ui/avatar/src';
import { User } from '../../../auth/interfaces/user';

@Component({
  selector: 'app-dashboard-profile',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmAvatarImports,
  ],
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly usersService = inject(UsersService);
  private readonly coursesService = inject(CoursesService);
  private readonly platformId = inject(PLATFORM_ID);

  userProfile = signal<User | null>(null);
  enrolledCount = signal<number>(0);
  completedCount = signal<number>(0);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadProfile();
      this.loadStats();
    }
  }

  loadProfile() {
    this.usersService.getProfile().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.userProfile.set(res.data);
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }

  loadStats() {
    this.coursesService.getMyEnrollments().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.enrolledCount.set(res.data.length);
          const completed = res.data.filter((e: any) => e.progress === 100).length;
          this.completedCount.set(completed);
        }
      },
    });
  }

  handleAvatarError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/hero_student.png';
  }
}
