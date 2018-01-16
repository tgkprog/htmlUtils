import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log("Logged in user");
            if(this.authService.isAdmin()){
                console.log("admin!!!");
                return true;
            }else {
                console.log("Not admin!!!");
                this.router.navigate(['/error/You do have permissions to view Admin page']);
                return false;
            }
        }
    }
}