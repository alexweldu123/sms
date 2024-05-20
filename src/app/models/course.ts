import { Department } from './department';
import { Student } from './Student';

export interface Course {
  id: number;
  title: string;
  credits: number;
  departmentID: number;
  department?: Department;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  enrollmentId: number;
  courseId: number;
  studentId: number;
  course?: Course;
  student?: Student;
}
