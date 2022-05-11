import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams';
  isLoggedIn: boolean = false;
  CurrentURL: string = '';
  constructor(private authService: AuthenticationService, private router: Router, private location: Location) {

    if (location.path() == '/login') {
      localStorage.removeItem('isLoggedIn');
    }

  }

  ngOnInit(): void {

  }
  checkLoggedIn(): void {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

  }
}

