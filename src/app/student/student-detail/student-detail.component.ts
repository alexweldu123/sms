import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../models/Student';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent implements OnInit {
  student: Student = { id: 0, name: '', enrollments: [] };
  courseToEnroll?: number;

  courses: any[] = [];

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudent(id).subscribe((student) => {
      console.log(student);
      this.student = student;
    });

    this.getListOfCourses();
  }

  goBack(): void {
    window.history.back();
  }

  enrollCourse(courseId: any) {
    console.log(courseId);
    this.studentService
      .enrollCourse(
        Number(this.route.snapshot.paramMap.get('id')),
        Number(courseId)
      )
      .subscribe(() => this.ngOnInit());
  }

  getListOfCourses() {
    return this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
