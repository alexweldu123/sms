import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  departments: Department[] = [];

  newCourse: Course = { id: 0, title: '', credits: 0, departmentID: 0 };
  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));

    this.departmentService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));
  }
  addCourse(): void {
    this.courseService
      .addCourse({
        id: 0,
        title: this.newCourse.title,
        credits: this.newCourse.credits,
        departmentID: Number(this.newCourse.departmentID),
      })
      .subscribe(() => {
        this.ngOnInit();
      });
    this.newCourse = { id: 0, title: '', credits: 0, departmentID: 0 };
  }

  getDepartmentName(course: Course): string | undefined {
    return this.departments.find((d) => d.id === course.departmentID)?.name;
  }

  deleteCourse(id: number) {
    return this.courseService.deleteCourse(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
