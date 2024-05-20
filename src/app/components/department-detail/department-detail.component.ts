import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.css',
})
export class DepartmentDetailComponent implements OnInit {
  department?: Department;
  course: Course = { id: 0, title: '', credits: 4, departmentID: 0 };

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.departmentService
      .getDepartment(id)
      .subscribe((department: Department) => (this.department = department));
  }

  goBack(): void {
    window.history.back();
  }
  addCourse(): void {
    this.departmentService
      .addCourse({
        id: 0,
        title: this.course.title,
        credits: this.course.credits,
        departmentID: Number(this.route.snapshot.paramMap.get('id')),
      })
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  deleteCourse(arg0: number) {
    return this.departmentService.deleteCourse(arg0).subscribe(() => {
      this.ngOnInit();
    });
  }
  editCourse(arg0: number) {
    throw new Error('Method not implemented.');
  }
}
