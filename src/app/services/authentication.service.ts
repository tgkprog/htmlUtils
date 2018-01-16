import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    profile: string;
    constructor(private http: Http) { }

    login(username: string, password: string, userProfile:string) {
        this.profile = userProfile;
        return this.http.get("./app/loginData.json")
            .map(users => {
                console.log(users.json());
                let userList = users.json();
                // store user details in local storage to keep user logged in between page refreshes
                for(let user of userList){
                    if(username == user.username && password == user.password){
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        if(user.role.split(",").length>1 || user.role == "admin"){
                            localStorage.setItem("multiAppAccess", "true");
                        }
                        return user;
                    }
                }
                return "Access Denied";
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem("multiAppAccess");
    }

    isAdmin():boolean{
        if(JSON.parse(localStorage.getItem('currentUser')).role == "admin"){
            return true;
        }
        return false;
    }

}