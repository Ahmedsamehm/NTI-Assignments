import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-course-syllabus',
  standalone: true,
  imports: [CommonModule, HlmSeparatorImports, HlmAccordionImports, HlmBadgeImports],
  templateUrl: './course-syllabus.html',
})
export class CourseSyllabusComponent {
  syllabus = input.required<any[]>();
  selectLesson = output<any>();

  onLessonSelect(lesson: any) {
    if (!lesson.isLocked) {
      this.selectLesson.emit(lesson);
    }
  }
}
