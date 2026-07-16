import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-metric-card',
  standalone: true,
  templateUrl: './metric-card.html',
})
export class DashboardMetricCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  type = input.required<'courses' | 'modules' | 'streak'>();
}
