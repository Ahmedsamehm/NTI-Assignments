import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardSidebarComponent } from '../../components/sidebar/sidebar';
import { DashboardHeaderComponent } from '../../components/header/header';
import { MobileNavComponent, MobileNavItem } from '../../../../shared/components/mobile-nav/mobile-nav';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    MobileNavComponent,
  ],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  /** Sidebar open state — true by default on desktop, toggled on mobile */
  sidebarOpen = signal(true);

  dashboardNavItems: MobileNavItem[] = [
    {
      label: 'Home',
      routerLink: '/',
      iconName: 'home',
    },
    {
      label: 'Dashboard',
      routerLink: '/dashboard',
      iconName: 'learning',
    },
    {
      label: 'Courses',
      routerLink: '/dashboard/courses',
      iconName: 'courses',
    },
  ];

  constructor(protected authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.user()) {
      this.authService.me().subscribe();
    }
  }

  toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }
}
