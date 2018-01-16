import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './../services/authentication.service';
import {AlertService} from './../services/alert.service';
 
@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls:  ['./login.component.css'],
})
export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string;
	
	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

	ngOnInit(){
		// reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, this.model.profile)
            .subscribe(
                data => {
                    console.log(data);
                    console.log(this.returnUrl);
                    if(data == "Access Denied"){
                        this.alertService.error("Access Denied!! Invalid Credentials. Please try again", true);
                        this.loading = false;
                        return;
                    }
                    if(data.role == "admin"){
                        this.router.navigate(["/superDashboard"]);
                    }
                    else{
                        if(data.role.includes(this.model.profile)){
                            console.log("Profile matches");
                            this.router.navigate(["/appDashboard/"+this.model.profile]);
                        }
                        else{
                            console.log("Profile Mismatch!!");
                            this.alertService.error("You do not have access to "+this.model.profile+" Application. Redirecting...", true);
                            this.router.navigate(["/appDashboard/"+data.role.split(",")[0]]);
                        }
                        
                    }
                    // else{
                    //     this.router.navigate([this.returnUrl]);
                    // }
                },
                error => {
                    this.alertService.error(error,true);
                    this.loading = false;
                });
    }
	

}