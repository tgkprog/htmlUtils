import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
 
@Component({
	selector: 'error',
	templateUrl: './error-component.html',

})
export class ErrorComponent {
	message: string = "Oops!! Something went wrong. Try again";
	reRouteLink: string = "/appDashboard/";

	constructor(private route:ActivatedRoute){
		console.log(this.message);
    }
	ngOnInit(){
		this.route.params.subscribe(
            p => {this.message = p['message']; console.log(this.message);}
        )
		let appName = JSON.parse(localStorage.getItem("currentUser")).role.split(",")[0];
		console.log(appName);
		this.reRouteLink +=appName;
	}
}