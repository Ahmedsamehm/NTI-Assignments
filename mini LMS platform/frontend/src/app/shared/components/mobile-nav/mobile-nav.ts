import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MobileNavItem {
  label: string;
  routerLink: string;
  iconName: 'home' | 'courses' | 'plus' | 'learning' | 'profile' | 'login' | 'register';
  isSpecial?: boolean; // Highlighted center button
}

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav.html',
})
export class MobileNavComponent {
  items = input<MobileNavItem[]>([]);
}
