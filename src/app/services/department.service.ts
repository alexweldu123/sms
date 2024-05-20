import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { CourseService } from './course.service';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:5225/api/Department';

  constructor(private http: HttpClient, private courseService: CourseService) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  addCourse(course: Course): Observable<Course> {
    console.log(course);

    return this.courseService.addCourse(course);
  }
  deleteCourse(id: number) {
    return this.courseService.deleteCourse(id);
  }
  deleteDepartment(id: number) {
    console.log(this.apiUrl + '/' + id);

    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
