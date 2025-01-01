import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  userLoggedIn = false;
  userLoggingIn = false;
  isLogoutButtonVisible=false;
  constructor(private router: Router, private authService: LoginService) {}

  ngOnInit(): void {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    // console.log(isUserLoggedIn);
    if (isUserLoggedIn==='true') {
      this.userLoggedIn = true;
    }
    const userloggingIn = localStorage.getItem('userLoggingIn');
    if (userloggingIn) {
      this.userLoggingIn = true;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url);
        if(event.url==='/login' ||event.url==='/signup'){
          this.isLogoutButtonVisible=false;
        }else{  
          this.isLogoutButtonVisible=true;
        }
      }

    });
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
    localStorage.removeItem('isUserLoggedIn');

  }
  navigateToProducts() {
    this.router.navigate(['/products']);
  }
  signout() {
    this.router.navigate(['/login']);
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout and redirect to login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
