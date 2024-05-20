import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent: any = {};
  selectedStudentId: number = 0;
  constructor(private studentService: StudentService) {}
  ngOnInit(): void {
    this.studentService
      .getStudents()
      .subscribe((students: any[]) => (this.students = students));
  }

  addStudent(): void {
    this.studentService.addStudent(this.newStudent).subscribe(() => {
      this.newStudent = {};
      this.ngOnInit();
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.ngOnInit();
    });
  }
  onClieck(id: number): boolean {
    return this.selectedStudentId === id;
  }
}
