import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
 
@Component({
	selector: 'app-main-component',
	templateUrl: './main-component.html',
	styleUrls:  ['./main-component.css'],
})
export class MainComponent {
	appName: String = "app1";
	menuName: String = "Business";
	constructor(private route:ActivatedRoute){

    }
	ngOnInit(){
		this.route.params.subscribe(
            p => this.appName = p['id']
        )
	}
	menuChanged(event){
		this.menuName=event;
		console.log(this.menuName);
	}

}