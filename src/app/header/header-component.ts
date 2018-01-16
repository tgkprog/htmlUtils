import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
 
@Component({
	selector: 'header-component',
	templateUrl: './header-component.html',
	styleUrls:  ['./header-component.css'],
})
export class HeaderComponent {
	user: any;
	multiAppAccess:boolean;
	appList: string[] = [];
	showDropDown: boolean = false;

	constructor(private authService: AuthenticationService,
		private router: Router){ }
	ngOnInit(){
		this.user = JSON.parse(localStorage.getItem("currentUser"));
		this.multiAppAccess = Boolean(localStorage.getItem("multiAppAccess"));
		if(this.multiAppAccess && this.user){
			let roles = this.user.role;
			if(roles=="admin"){
				this.appList.push("superDashboard");
				this.appList.push("app1");
				this.appList.push("app2");
				this.appList.push("app3");
				this.appList.push("app4");
			}
			else{
				for(let app of (roles.split(","))){
					this.appList.push(app);
				}
			}
		}
	}
	ngDoCheck(){
		this.user = JSON.parse(localStorage.getItem("currentUser"));
		this.multiAppAccess = Boolean(localStorage.getItem("multiAppAccess"));
		if(this.multiAppAccess && this.user && this.appList.length==0){
			let roles = this.user.role;
			if(roles=="admin"){
				this.appList.push("superDashboard");
				this.appList.push("app1");
				this.appList.push("app2");
				this.appList.push("app3");
				this.appList.push("app4");
			}
			else{
				for(let app of (roles.split(","))){
					this.appList.push(app);
				}
			}
		}
	}
	logout(){
		this.appList = [];
		this.authService.logout();
		this.router.navigate(["/login"]);
	}
	redirect(app:any){
		if(app=="superDashboard"){
			this.router.navigate(["/"+app]);	
		}
		else{
			this.router.navigate(["/appDashboard/"+app]);
		}
		
	}
	
}