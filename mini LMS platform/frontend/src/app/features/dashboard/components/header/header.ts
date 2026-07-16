import { Component, input } from '@angular/core';
import { User } from '../../../auth/interfaces/user';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  templateUrl: './header.html',
})
export class DashboardHeaderComponent {
  user = input<User | null>(null);
}
