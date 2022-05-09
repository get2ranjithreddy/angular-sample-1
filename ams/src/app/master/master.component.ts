import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  isLoggedIn: boolean = false;
  isShowClass: boolean = false;
  constructor(private authService: AuthenticationService) { }
  UserRole?: string = '';
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.UserRole = localStorage.getItem("UserRole")?.toString();
  }
  addClass() {
    this.isShowClass = true;
  }
}
