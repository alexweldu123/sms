import { Course } from './course';

export interface Student {
  id: number;
  name: string;
  enrollments: Enrollment[];
}

export interface Enrollment {
  enrollmentId: number;
  courseId: number;
  studentId: number;
  course: Course;
  student?: Student;
}
