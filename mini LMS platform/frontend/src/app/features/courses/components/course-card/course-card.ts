import { Component, input } from '@angular/core';
import { Course } from '../../interfaces/course';
import { RouterLink } from '@angular/router';
import { HlmCardImports } from '../../../../shared/components/ui/card/src';
import { HlmBadgeImports } from '../../../../shared/components/ui/badge/src';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink, HlmCardImports, HlmBadgeImports, HlmButtonImports],
  templateUrl: './course-card.html',
})
export class CourseCardComponent {
  course = input.required<Course>();
}
