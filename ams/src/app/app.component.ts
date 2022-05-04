import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams';
  isLoggedIn: boolean = false;
   

  constructor(private authService: AuthenticationService, private router: Router) {

    // on route change to '/login', set the variable showHead to false
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }

  checkLoggedIn(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (!this.isLoggedIn) {      
      $("#divrouter").hide();
    }
    else {  
      $("#divrouter").show();
    }
  }
}

