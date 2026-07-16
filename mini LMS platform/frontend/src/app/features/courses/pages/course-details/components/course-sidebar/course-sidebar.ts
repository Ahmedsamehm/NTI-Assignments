import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-course-sidebar',
  standalone: true,
  imports: [CommonModule, HlmCardImports],
  templateUrl: './course-sidebar.html',
})
export class CourseSidebarComponent {}
