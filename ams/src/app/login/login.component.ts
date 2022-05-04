import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from './Login.model';
import { TimesheetService } from '../services/timesheet.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginObj: Login = new Login();
  submitted = false;
  options: string[];
  Role : string = "";
  constructor(private fb: FormBuilder,
    private timeSheetService: TimesheetService, private router: Router, private authService: AuthenticationService) {

    this.loginForm = this.fb.group({
    //  email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
     // password: ['', [Validators.required, Validators.minLength(6)]],
      selectRole:  ['', Validators.required]
    });
    this.options = [
      "Admin",
      "Manager",
      "Employee"
    ];

  }
  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; } 

  // get checkboxvalue() {
  //   return this.loginForm.get('isManager') as FormControl;
  // }

  onChange(e: any) {
   this.Role = e.target.value;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loginObj.Email = this.loginForm.value.email;
    this.loginObj.Password = this.loginForm.value.password;
    //Get CheckBox Value
    //this.loginObj.IsManager =this.loginForm.value.isManager;
    console.log(this.Role);
    if(this.Role == "Manager")
    {
      this.loginObj.UserRole = "true";
    }
    else if(this.Role == "Employee")
    {
      this.loginObj.UserRole = "false";
    }
    else if(this.loginObj.Email == "admin" && this.loginObj.Password == "admin" && this.Role == "Admin")
    {
      this.authService.isLoggedIn = true;
      localStorage.setItem('UserRole', this.Role);      
      this.router.navigate([this.authService.successPage]);      
    }
    console.log(this.loginObj);
   
    if(this.Role == "Manager" || this.Role== "Employee")
    {
    this.authService.getUserLoggedIn(this.loginObj)
      .subscribe((response: any) => {
        console.log(response);
        if (response) {
          alert("Logged in Successfully");
          console.log(response);        
          localStorage.setItem('Id', response.Id);         
          localStorage.setItem('UserRole', this.Role);
          this.authService.isLoggedIn = true;
          this.router.navigate([this.authService.successPage]);
        }
        else {
          this.loginForm.reset();
          alert("Invalid access");
        }
        //  this.router.navigateByUrl('master');
      });
    }
  }
}  
