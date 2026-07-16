import { Component, OnInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../users/services/users.service';
import { CoursesService } from '../../../courses/services/courses.service';
import {
  AdminUser,
  CreateUserPayload,
  UpdateUserPayload,
} from '../../../users/interfaces/admin-user';
import { Course } from '../../../courses/interfaces/course';
import { Category } from '../../../courses/interfaces/category';
import { CourseFormModalComponent } from '../../components/course-form-modal/course-form-modal';

type Tab = 'users' | 'courses' | 'categories';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseFormModalComponent],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboardComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly coursesService = inject(CoursesService);
  private readonly platformId = inject(PLATFORM_ID);

  activeTab = signal<Tab>('users');

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  users = signal<AdminUser[]>([]);
  usersLoading = signal(false);

  showUserModal = signal(false);
  editingUser = signal<AdminUser | null>(null);
  userForm = signal<CreateUserPayload>({ name: '', email: '', password: '', role: 'student' });
  userSaving = signal(false);

  confirmDeleteUserId = signal<string | null>(null);
  userDeleting = signal(false);

  courses = signal<Course[]>([]);
  coursesLoading = signal(false);

  showCourseModal = signal(false);
  editingCourse = signal<Course | null>(null);
  courseDeleting = signal(false);
  confirmDeleteCourseId = signal<string | null>(null);
  courseSaving = signal(false);

  categories = signal<Category[]>([]);
  categoriesLoading = signal(false);

  showCategoryModal = signal(false);
  editingCategory = signal<Category | null>(null);
  categoryForm = signal<{ name: string; description: string }>({ name: '', description: '' });
  categorySaving = signal(false);
  confirmDeleteCategoryId = signal<string | null>(null);
  categoryDeleting = signal(false);

  totalUsers = computed(() => this.users().length);
  totalCourses = computed(() => this.courses().length);
  totalCategories = computed(() => this.categories().length);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAll();
    }
  }

  loadAll() {
    this.loadUsers();
    this.loadCourses();
    this.loadCategories();
  }

  loadUsers() {
    this.usersLoading.set(true);
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users.set((res.data as unknown as AdminUser[]) ?? []);
        this.usersLoading.set(false);
      },
      error: () => this.usersLoading.set(false),
    });
  }

  openCreateUser() {
    this.editingUser.set(null);
    this.userForm.set({ name: '', email: '', password: '', role: 'student' });
    this.showUserModal.set(true);
  }

  openEditUser(user: AdminUser) {
    this.editingUser.set(user);
    this.userForm.set({ name: user.name, email: user.email, password: '', role: user.role });
    this.showUserModal.set(true);
  }

  closeUserModal() {
    this.showUserModal.set(false);
    this.editingUser.set(null);
  }

  saveUser() {
    const form = this.userForm();
    if (!form.name.trim() || !form.email.trim()) return;
    this.userSaving.set(true);

    const editing = this.editingUser();
    const request = editing
      ? this.usersService.updateUser(editing._id, {
          name: form.name,
          email: form.email,
          role: form.role,
        } as UpdateUserPayload)
      : this.usersService.createUser(form);

    request.subscribe({
      next: () => {
        this.userSaving.set(false);
        this.closeUserModal();
        this.loadUsers();
      },
      error: () => this.userSaving.set(false),
    });
  }

  askDeleteUser(id: string) {
    this.confirmDeleteUserId.set(id);
  }

  cancelDeleteUser() {
    this.confirmDeleteUserId.set(null);
  }

  confirmDeleteUser() {
    const id = this.confirmDeleteUserId();
    if (!id) return;
    this.userDeleting.set(true);
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.userDeleting.set(false);
        this.confirmDeleteUserId.set(null);
        this.users.update((list) => list.filter((u) => u._id !== id));
      },
      error: () => {
        this.userDeleting.set(false);
        this.confirmDeleteUserId.set(null);
      },
    });
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'instructor':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  loadCourses() {
    this.coursesLoading.set(true);
    this.coursesService.getAvailableCourses().subscribe({
      next: (res) => {
        this.courses.set(res?.data?.data ?? []);
        this.coursesLoading.set(false);
      },
      error: () => this.coursesLoading.set(false),
    });
  }

  openCreateCourse() {
    this.editingCourse.set(null);
    this.showCourseModal.set(true);
  }

  openEditCourse(course: Course) {
    this.editingCourse.set(course);
    this.showCourseModal.set(true);
  }

  closeCourseModal() {
    this.showCourseModal.set(false);
    this.editingCourse.set(null);
  }

  onSaveCourse(data: Partial<Course>) {
    this.courseSaving.set(true);
    const editing = this.editingCourse();
    const request = editing
      ? this.coursesService.updateCourse(editing._id, data)
      : this.coursesService.createCourse(data);

    request.subscribe({
      next: () => {
        this.courseSaving.set(false);
        this.closeCourseModal();
        this.loadCourses();
      },
      error: () => this.courseSaving.set(false),
    });
  }

  askDeleteCourse(id: string) {
    this.confirmDeleteCourseId.set(id);
  }

  cancelDeleteCourse() {
    this.confirmDeleteCourseId.set(null);
  }

  confirmDeleteCourse() {
    const id = this.confirmDeleteCourseId();
    if (!id) return;
    this.courseDeleting.set(true);
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        this.courseDeleting.set(false);
        this.confirmDeleteCourseId.set(null);
        this.courses.update((list) => list.filter((c) => c._id !== id));
      },
      error: () => {
        this.courseDeleting.set(false);
        this.confirmDeleteCourseId.set(null);
      },
    });
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/images/hero_student.png';
  }

  loadCategories() {
    this.categoriesLoading.set(true);
    this.coursesService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res?.data?.data ?? []);
        this.categoriesLoading.set(false);
      },
      error: () => this.categoriesLoading.set(false),
    });
  }

  openCreateCategory() {
    this.editingCategory.set(null);
    this.categoryForm.set({ name: '', description: '' });
    this.showCategoryModal.set(true);
  }

  openEditCategory(cat: Category) {
    this.editingCategory.set(cat);
    this.categoryForm.set({ name: cat.name, description: cat.description ?? '' });
    this.showCategoryModal.set(true);
  }

  closeCategoryModal() {
    this.showCategoryModal.set(false);
    this.editingCategory.set(null);
  }

  saveCategory() {
    const form = this.categoryForm();
    if (!form.name.trim()) return;
    this.categorySaving.set(true);
    const editing = this.editingCategory();
    const request = editing
      ? this.coursesService.updateCategory(editing._id, form)
      : this.coursesService.createCategory(form);

    request.subscribe({
      next: () => {
        this.categorySaving.set(false);
        this.closeCategoryModal();
        this.loadCategories();
      },
      error: () => this.categorySaving.set(false),
    });
  }

  askDeleteCategory(id: string) {
    this.confirmDeleteCategoryId.set(id);
  }

  cancelDeleteCategory() {
    this.confirmDeleteCategoryId.set(null);
  }

  confirmDeleteCategory() {
    const id = this.confirmDeleteCategoryId();
    if (!id) return;
    this.categoryDeleting.set(true);
    this.coursesService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryDeleting.set(false);
        this.confirmDeleteCategoryId.set(null);
        this.categories.update((list) => list.filter((c) => c._id !== id));
      },
      error: () => {
        this.categoryDeleting.set(false);
        this.confirmDeleteCategoryId.set(null);
      },
    });
  }
}
