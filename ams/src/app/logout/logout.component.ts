import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  template : '',
  styles : []
})
export class LogoutComponent implements OnInit {

  constructor(private authService : AuthenticationService , private router : Router) { }

  ngOnInit(): void { 
    this.authService.isLoggedIn = false;
    this.authService.logout();
  }

}
