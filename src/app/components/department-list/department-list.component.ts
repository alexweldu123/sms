import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  newDepartment: Department = { id: 0, name: '', courses: [] };
  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService
      .getDepartments()
      .subscribe(
        (departments: Department[]) => (this.departments = departments)
      );
  }

  addDepartment(): void {
    if (!this.newDepartment.name) {
      return;
    }
    this.departmentService.addDepartment(this.newDepartment).subscribe(() => {
      this.newDepartment = {
        id: 0,
        name: this.newDepartment.name,
        courses: [],
      };
      this.ngOnInit();
    });
  }
  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.ngOnInit();
    });
  }
  editDepartment(id: number) {
    throw new Error('Method not implemented.');
  }
}
