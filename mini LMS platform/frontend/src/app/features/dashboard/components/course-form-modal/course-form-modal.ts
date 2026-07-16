import { Component, input, output, signal, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../courses/interfaces/course';
import { Category } from '../../../courses/interfaces/category';
import { CoursesService } from '../../../courses/services/courses.service';

@Component({
  selector: 'app-course-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form-modal.html',
})
export class CourseFormModalComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);

  course = input<Course | null>(null);

  save = output<Partial<Course>>();
  cancel = output<void>();

  title = signal('');
  description = signal('');
  category = signal('');
  price = signal<number | null>(null);
  isPaid = signal(false);

  categories = signal<Category[]>([]);
  isCategoriesLoading = signal(false);

  constructor() {
    effect(() => {
      const c = this.course();
      this.title.set(c?.title ?? '');
      this.description.set(c?.description ?? '');
      this.category.set(c?.category ?? '');
      this.price.set(c?.price ?? null);
      this.isPaid.set(c?.isPaid ?? false);
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isCategoriesLoading.set(true);
    this.coursesService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res?.data?.data ?? []);
        this.isCategoriesLoading.set(false);
      },
      error: () => this.isCategoriesLoading.set(false),
    });
  }

  get isEditMode(): boolean {
    return !!this.course();
  }

  get isValid(): boolean {
    return !!this.title().trim() && !!this.description().trim() && !!this.category().trim();
  }

  onSave() {
    if (!this.isValid) return;
    this.save.emit({
      title: this.title().trim(),
      description: this.description().trim(),
      category: this.category().trim(),
      isPaid: this.isPaid(),
      price: this.isPaid() ? (this.price() ?? 0) : 0,
    });
  }
}
