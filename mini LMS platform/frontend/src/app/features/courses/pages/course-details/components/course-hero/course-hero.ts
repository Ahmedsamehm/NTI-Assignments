import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
  selector: 'app-course-hero',
  standalone: true,
  imports: [CommonModule, HlmCardImports, HlmBadgeImports, HlmButtonImports, HlmAvatarImports],
  templateUrl: './course-hero.html',
})
export class CourseHeroComponent {
  courseDetails = input.required<any>();
  isEnrolled = input<boolean>(false);
  isOwner = input<boolean>(false);
  enroll = output<void>();

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/hero_student.png';
  }
}
