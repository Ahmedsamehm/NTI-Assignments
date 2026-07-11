import { Component, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

interface MockCourse {
  image: string;
  category: string;
  title: string;
  instructor: string;
  description: string;
  rating: number;
  reviewsCount: string;
}

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-list.html',
})
export class CoursesListComponent {
  categories = signal<string[]>([
    'All Topics',
    'Design',
    'Development',
    'Business',
    'Marketing',
    'More'
  ]);
  
  activeCategory = signal<string>('All Topics');

  courses = signal<MockCourse[]>([
    {
      image: '/images/course_ui_ux.png',
      category: 'Design',
      title: 'UX/UI Design Fundamentals',
      instructor: 'Sarah Jenkins',
      description: 'Master the basics of user experience and interface design ...',
      rating: 4.8,
      reviewsCount: '1.2k'
    },
    {
      image: '/images/course_react.png',
      category: 'Development',
      title: 'Advanced React Patterns',
      instructor: 'David Chen',
      description: 'Elevate your front-end skills by learning complex state... management, custom hooks, and',
      rating: 4.9,
      reviewsCount: '850'
    },
    {
      image: '/images/course_data.png',
      category: 'Business',
      title: 'Data-Driven Decision Making',
      instructor: 'Elena Rodriguez',
      description: 'Learn how to analyze complex datasets and translate insights in...',
      rating: 4.7,
      reviewsCount: '3.4k'
    },
    {
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600',
      category: 'Technology',
      title: 'Introduction to Machine Learning',
      instructor: 'Dr. Alan Turing',
      description: 'A beginner-friendly exploration of ML algorithms, neural networks,...',
      rating: 4.9,
      reviewsCount: '5.1k'
    },
    {
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600',
      category: 'Writing',
      title: 'Creative Copywriting',
      instructor: 'Maya Lin',
      description: 'Craft compelling narratives and persuasive copy that captures...',
      rating: 4.6,
      reviewsCount: '920'
    },
    {
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600',
      category: 'Design',
      title: '3D Modeling for Beginners',
      instructor: 'Tom Hiddles',
      description: 'Step into the world of 3D creation. Learn the foundational tools and...',
      rating: 4.8,
      reviewsCount: '2.1k'
    }
  ]);

  constructor(private authService: AuthService) {
    this.authService.me();
  }
}

