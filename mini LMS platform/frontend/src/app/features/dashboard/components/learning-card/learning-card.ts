import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dashboard-learning-card',
  standalone: true,
  templateUrl: './learning-card.html',
})
export class DashboardLearningCardComponent {
  courseTitle = input.required<string>();
  moduleTitle = input.required<string>();
  category = input.required<string>();
  image = input<string>();
  progress = input.required<number>(); // 0 to 100

  action = output<void>();

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/hero_student.png';
  }
}
