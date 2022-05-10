
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // not logged in so redirect to login page with the return url
        if (this.authenticationService.isLoggedIn) {
            return true;
        }
            // let Role = localStorage.getItem("UserRole");
            // if (state.url == '/managerviewTimeSheet') {
            //     if (Role == "Manager" || Role == 'Admin') {                     
            //         return true;
            //     }
            //     else {
            //         alert("You don't have permission to access this page ");
            //         return false;
            //     }
            // } 
        else {
            //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            this.authenticationService.successPage = state.url;            
            this.router.navigate(['/login']);
            return false;
        }
    }
}
