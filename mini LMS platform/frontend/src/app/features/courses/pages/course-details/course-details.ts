import { Component, signal, computed, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';
import { Footer } from '../../../../shared/components/footer/footer';
import { HlmCardImports } from '../../../../shared/components/ui/card/src';
import { HlmBadgeImports } from '../../../../shared/components/ui/badge/src';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';
import { HlmAvatarImports } from '../../../../shared/components/ui/avatar/src';
import { HlmSeparatorImports } from '../../../../shared/components/ui/separator/src';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CourseHeroComponent } from './components/course-hero/course-hero';
import { CourseSyllabusComponent } from './components/course-syllabus/course-syllabus';
import { CourseSidebarComponent } from './components/course-sidebar/course-sidebar';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  duration: string;
  isLocked: boolean;
  hasPreview?: boolean;
  isCompleted?: boolean;
}

interface SyllabusModule {
  moduleNumber: number;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer,
    HlmCardImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmAvatarImports,
    HlmSeparatorImports,
    HlmAccordionImports,
    CourseHeroComponent,
    CourseSyllabusComponent,
    CourseSidebarComponent,
  ],
  templateUrl: './course-details.html',
})
export class CourseDetailsComponent implements OnInit {
  private readonly authService = inject(AuthService);
  courseId: string | null = null;
  isEnrolled = signal<boolean>(false);
  isOwner = computed(() => {
    const details = this.courseDetails();
    const user = this.authService.user();
    if (!details || !user) return false;
    const currentUserId = user._id || user.id;
    return details.instructor?.id === currentUserId;
  });
  enrollmentId = signal<string | null>(null);
  completedLessonIds = signal<string[]>([]);

  courseDetails = signal<any>({
    title: '',
    description: '',
    rating: 0,
    price: '',
    isPaid: true,
    image: '/images/hero_student.png',
    instructor: {
      name: '',
      role: 'Instructor',
      avatar: '/images/student1.png',
    },
  });

  syllabus = signal<SyllabusModule[]>([]);

  // Lesson player modal states
  selectedLesson = signal<Lesson | null>(null);
  showPlayer = signal<boolean>(false);
  isUpdatingProgress = signal<boolean>(false);

  // Fake checkout and success modals
  showCheckoutModal = signal<boolean>(false);
  showSuccessModal = signal<boolean>(false);
  isProcessingPayment = signal<boolean>(false);
  notification = signal<{ message: string; type: 'success' | 'error' } | null>(null);

  // Mock billing/payment inputs
  cardHolder = signal<string>('Alex Newman');
  cardNumber = signal<string>('4242 4242 4242 4242');
  cardExpiry = signal<string>('12/28');
  cardCvv = signal<string>('123');

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.checkEnrollmentAndLoadCourse();
    }
  }

  checkEnrollmentAndLoadCourse() {
    if (!this.courseId) return;

    // 1. Fetch user enrollments to check if they are enrolled
    this.coursesService.getMyEnrollments().subscribe({
      next: (enrollmentRes) => {
        const matchingEnrollment = enrollmentRes.data?.find(
          (e: any) => e.course?._id === this.courseId,
        );

        if (matchingEnrollment) {
          this.isEnrolled.set(true);
          this.enrollmentId.set(matchingEnrollment._id);
          this.completedLessonIds.set(
            matchingEnrollment.completedLessons?.map((cl: any) => cl.lesson) || [],
          );
        } else {
          this.isEnrolled.set(false);
          this.enrollmentId.set(null);
          this.completedLessonIds.set([]);
        }

        // 2. Load course details
        this.loadCourseDetails();
      },
      error: (err) => {
        console.warn('Error checking enrollments, assuming guest mode:', err);
        this.isEnrolled.set(false);
        this.loadCourseDetails();
      },
    });
  }

  loadCourseDetails() {
    if (!this.courseId) return;

    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        const apiCourse = res.data;
        this.courseDetails.set({
          title: apiCourse.title,
          description: apiCourse.description,
          rating: apiCourse.rating || 0,
          isPaid: apiCourse.isPaid,
          price: apiCourse.price
            ? `$${apiCourse.price}`
            : apiCourse.isPaid === false
              ? 'Free'
              : '$0.00',
          image: '/images/hero_student.png',
          instructor: {
            _id: apiCourse.instructor?._id || apiCourse.instructor?.id || apiCourse.instructor,
            name: apiCourse.instructor?.name || 'Instructor',
            email: apiCourse.instructor?.email || '',
          },
        });

        if (apiCourse.lessons && apiCourse.lessons.length > 0) {
          const mappedLessons = apiCourse.lessons.map((lesson: any, index: number) => {
            const isCompleted = this.completedLessonIds().includes(lesson._id || lesson.id);
            const currentUserId = this.authService.user()?._id || this.authService.user()?.id;
            const isOwner =
              (apiCourse.instructor as any) === currentUserId ||
              apiCourse.instructor?._id === currentUserId ||
              apiCourse.instructor?.id === currentUserId;
            const isAdmin = this.authService.user()?.role === 'admin';
            const isLocked = !this.isEnrolled() && !isOwner && !isAdmin;

            return {
              id: lesson._id || lesson.id,
              title: lesson.title,
              content: lesson.content || 'No description provided.',
              videoUrl: lesson.videoUrl,
              duration: '15:00',
              isLocked: isLocked,
              hasPreview: !this.isEnrolled() && index === 0,
              isCompleted: isCompleted,
            };
          });

          this.syllabus.set([
            {
              moduleNumber: 1,
              title: 'Course Content',
              lessonsCount: apiCourse.lessons.length,
              duration: `${apiCourse.lessons.length * 15}m`,
              lessons: mappedLessons,
            },
          ]);
        } else {
          this.syllabus.set([]);
        }
      },
      error: (err) => {
        console.error('Error loading course details:', err);
      },
    });
  }

  enroll() {
    if (!this.courseId) return;
    this.showCheckoutModal.set(true);
  }

  closeCheckout() {
    this.showCheckoutModal.set(false);
  }

  closeSuccessModal() {
    this.showSuccessModal.set(false);
  }

  showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.notification.set({ message, type });
    setTimeout(() => {
      this.notification.set(null);
    }, 4000);
  }

  processFakePayment() {
    if (!this.courseId) return;
    this.isProcessingPayment.set(true);

    // Simulate secure checkout gateway process
    setTimeout(() => {
      this.coursesService.enroll(this.courseId!).subscribe({
        next: () => {
          this.isProcessingPayment.set(false);
          this.showCheckoutModal.set(false);
          this.showSuccessModal.set(true);
          this.checkEnrollmentAndLoadCourse();
        },
        error: (err) => {
          this.isProcessingPayment.set(false);
          this.showCheckoutModal.set(false);
          this.showNotification(
            err.error?.message || 'Mock payment verification failed. Please check card info.',
            'error',
          );
        },
      });
    }, 2000);
  }

  onLessonSelected(lesson: any) {
    this.selectedLesson.set(lesson);
    this.showPlayer.set(true);
  }

  closePlayer() {
    this.showPlayer.set(false);
    this.selectedLesson.set(null);
  }

  markLessonCompleted() {
    const lesson = this.selectedLesson();
    const enrollment = this.enrollmentId();
    if (!lesson || !enrollment) return;

    this.isUpdatingProgress.set(true);
    this.coursesService.updateProgress(enrollment, lesson.id).subscribe({
      next: () => {
        this.isUpdatingProgress.set(false);
        // Refresh enrollments to update completion checklist
        this.checkEnrollmentAndLoadCourse();
        this.showNotification('Lesson marked as completed!');
        this.closePlayer();
      },
      error: (err) => {
        console.error('Failed to update progress:', err);
        this.isUpdatingProgress.set(false);
        this.showNotification('Failed to update progress. Please try again.', 'error');
      },
    });
  }
}
