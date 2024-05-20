import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUrl = '';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  getBreadcrumbSegments(): string[] {
    return this.currentUrl.split('/').filter((segment) => segment !== '');
  }

  getBreadcrumbLink(index: number): string {
    const segments = this.getBreadcrumbSegments().slice(0, index + 1);
    return `${segments.join('/')}`;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): any {
    return this.authService.isAdmin();
  }
}
