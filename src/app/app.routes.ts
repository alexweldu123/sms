import { Routes } from '@angular/router';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { LoginComponent } from './components/login/login.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentListComponent } from './student/student-list/student-list.component';

export const routes: Routes = [
  {
    path: '',
    data: { roles: ['admin', 'user'] },
    children: [
      {
        path: '',
        redirectTo: 'department',
        pathMatch: 'full',
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'department',
            component: DepartmentListComponent,
          },
          {
            path: 'department/:id',
            component: DepartmentDetailComponent,
          },
          {
            path: 'course',
            component: CourseListComponent,
          },
          {
            path: 'course/:id',
            component: CourseDetailComponent,
          },
          {
            path: 'student',
            component: StudentListComponent,
          },
          {
            path: 'student/:id',
            component: StudentDetailComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
