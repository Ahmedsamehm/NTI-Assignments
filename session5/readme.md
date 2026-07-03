## Design
UI designed in Figma — blue & white color scheme, clean and simple layout.
[Figma link](https://www.figma.com/design/BLBx1dQMzn5PEBfXrGexpu/mini-LMS-platform)

---

## Screenshots

| Landing Page |
|---|---|
| ![Landing](./screenshots/landing.png) |





# Mini E-Learning Platform (LMS)

A simple learning management system where instructors create courses and students enroll and track their progress.

**Stack:** Angular · Express.js · MongoDB · JWT Auth

---

## Idea

The platform has two types of users:

- **Instructor** – creates courses, adds lessons, manages their content
- **Student** – browses courses, enrolls, watches/reads lessons, tracks progress

The goal is a clean, simple LMS that covers full CRUD, authentication/authorization, and a MongoDB-based backend.

---

## Features

### Authentication & Authorization
- Register / Login with email & password (hashed with bcrypt)
- JWT access token + refresh token
- Role-based access (Student / Instructor routes are protected)

### Instructor
- Create, edit, delete courses
- Add, edit, reorder lessons inside a course
- View enrolled students and course stats

### Student
- Browse all courses (search + filter by category)
- Enroll in a course
- View lessons, mark them as complete
- Track progress (%) per course

### Dashboards
- Student: enrolled courses + progress
- Instructor: total courses, students, lessons

### Profile
- Update name/email
- Change password

---

## Database Models (MongoDB + Mongoose)

**User**
- name, email, password, role (student/instructor)

**Course**
- title, description, category, thumbnail, instructor (ref User), lessons (ref Lesson)

**Lesson**
- title, content, order, course (ref Course)

**Enrollment**
- student (ref User), course (ref Course), progress, completedLessons (ref Lesson)

---

## API Endpoints

**Auth**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
```

**Courses**
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses            (instructor)
PUT    /api/courses/:id        (instructor)
DELETE /api/courses/:id        (instructor)
```

**Lessons**
```
POST   /api/courses/:id/lessons  (instructor)
PUT    /api/lessons/:id          (instructor)
DELETE /api/lessons/:id          (instructor)
```

**Enrollment**
```
POST   /api/enrollments
GET    /api/enrollments/me
PATCH  /api/enrollments/:id/complete-lesson
```

**Users**
```
GET    /api/users/me
PUT    /api/users/me
```

---

## Security
- Passwords hashed with bcrypt
- JWT for authentication, role middleware for authorization
- Input validation on all forms/endpoints

---

## Setup

```bash
# backend
cd server
npm install
npm run dev

# frontend
cd client
npm install
ng serve
```

Create a `.env` file in `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

---

