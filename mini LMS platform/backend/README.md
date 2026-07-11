# Mini LMS Backend

This is the Express-based backend API for the Mini Learning Management System (LMS) platform.

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables:
   Copy `.env` and fill in details.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Run in production:
   ```bash
   npm start
   ```

## Database Schemas

### User Schema
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required)
- `role` (String, Enum: `'student'`, `'instructor'`, Default: `'student'`)

### Course Schema
- `title` (String, Required)
- `description` (String, Required)
- `category` (String, Required)
- `thumbnail` (String)
- `instructor` (ObjectId ref User, Required)
- `lessons` (Array of ObjectId ref Lesson)
- `isPaid` (Boolean, Default: false)
- `price` (Number, Default: 0)

### Lesson Schema
- `title` (String, Required)
- `content` (String, Required)
- `order` (Number, Required)
- `course` (ObjectId ref Course, Required)

### Enrollment Schema
- `student` (ObjectId ref User, Required)
- `course` (ObjectId ref Course, Required)
- `progress` (Number, Default: 0)
- `completedLessons` (Array of ObjectId ref Lesson)
- `isPaidDemo` (Boolean, Default: false)
- *Enforces unique constraint on `(student, course)`*

### Category Schema
- `name` (String, Required, Unique)
- `description` (String)

## API Endpoints

### Categories (`/api/v1/categories`)
- `GET /` - Get all categories (Public, paginated, supports `search`, `sort`, and `order`)
- `GET /:id` - Get a category by ID (Public)
- `POST /` - Create a new category (Admin only)
- `PATCH /:id` - Update a category (Admin only)
- `DELETE /:id` - Delete a category (Admin only)

