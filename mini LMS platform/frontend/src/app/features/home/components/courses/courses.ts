import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, HlmCardImports, HlmBadgeImports],
  templateUrl: './courses.html',
})
export class CoursesComponent {}
