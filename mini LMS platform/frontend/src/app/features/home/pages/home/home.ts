import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { PartnersComponent } from '../../components/partners/partners';
import { CategoriesComponent } from '../../components/categories/categories';
import { CoursesComponent } from '../../components/courses/courses';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    PartnersComponent,
    CategoriesComponent,
    CoursesComponent,
    HowItWorksComponent,
    TestimonialsComponent,
  ],
  templateUrl: './home.html',
})
export class HomeComponent {}
