import { Course } from './course';

export interface Department {
  id: number;
  name: string;
  courses: Course[];
}
