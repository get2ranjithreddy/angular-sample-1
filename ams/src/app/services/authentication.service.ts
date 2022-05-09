import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

 
import { Login } from '../login/Login.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
     isLoggedIn : boolean = false;
     successPage : string = 'dashboard';
    private url = 'http://10.189.129.239//AttendenceMgmt/';
    constructor(
        private router: Router,
        private httpClient: HttpClient)
        {}
     
        getUserLoggedIn(loginObj : Login)   {
          const params = new HttpParams()
            .set('Email', loginObj.Email)
            .set('Password', loginObj.Password)
            .set('IsManager', loginObj.UserRole);
          return this.httpClient.post(`${this.url}api/User/GetUserByEmailNPassword`, params)
        }
    // getUserLoggedIn(loginObj : Login) {
    //     alert(loginObj);
    //     const params = new HttpParams()
    //       .set('Email', loginObj.Email)
    //       .set('Password', loginObj.Password)
    //       .set('IsManager', loginObj.IsManager);
    //     return this.httpClient.post<object>(`${this.url}api/User/GetUserByEmailNPassword`, params)
    //     .pipe(map(user => {
    //         alert(user);
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));
    //         // this.userSubject.next(user);
    //         return user;
    //     }));
    //   }
     

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('Id');    
        localStorage.removeItem('UserRole');      
       // this.userSubject.next(null);
        this.router.navigate(['login']);
    }
}