import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit,Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'app-applications-component',
	templateUrl: './application-component.html',
	styleUrls:  ['./application-component.css'],
})
export class ApplicationsComponent {
	@Input() applName: string;

	curUsers: number;
	transactions: number;
	failedTrans: number;
	timestamp: Date;
	appName: String;
	constructor(
		private route: ActivatedRoute,
		private location: Location
	){}
	ngOnInit(): void {
		this.curUsers = 89;
		this.transactions = 195;
		this.failedTrans = 67;
		this.timestamp = new Date();
		this.getAppId();
		 if(this.applName == undefined){
			 this.applName = decodeURI(this.location.path().split('/').pop()) || "FA";
		 	console.log("after reset: "+this.applName);
		 }
   
	}

	appChanged(event){
		if(event.target.textContent.trim() !== "More"){
			this.applName = event.target.textContent;
			console.log(event.target.textContent);
		}
	}

	getAppId(): void {
	const appName = +this.route.snapshot.paramMap.get('appId');
	//console.log(this.route.params);
	}
	zonedate = Date.now();

}