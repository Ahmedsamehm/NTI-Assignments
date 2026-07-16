export interface Course {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  instructor?: any;
  rating?: number;
  reviewsCount?: string;
  thumbnail?: string;
  isPaid?: boolean;
  price?: number;
}
