import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphService} from '../services/graphs.service';
import { Chart } from 'angular-highcharts';
const Highcharts = require('highcharts');
 
@Component({
	selector: 'superDashboard',
	templateUrl: './superDashboard.component.html',
	styleUrls:  ['./superDashboard.component.css'],
})
export class SuperDashboardComponent {
    applist:any;
    showTooltip: boolean;
    app1Chart;
    app2Chart;
    app3Chart;

	constructor(private route:ActivatedRoute, private router: Router, private graphService: GraphService){

    }
	ngOnInit(){
        this.showTooltip = false;
        //this.graphService.getSuperData().subscribe(data => this.setInitData(data), error => console.log(error));
    this.graphService.getSuperData().subscribe(data => {this.applist=data}, error => console.log(error));
	}
//     setInitData(data:any){
//         let colors = Highcharts.getOptions().colors;
//         let localColors = ["#00cc00", "orange", "red"];
//         let catValues=["Performance", "Events", "Metrics"];
//         let initData = [{
//             y: 33.33,
//             color: colors[0],
//             drilldown: {
//                 name: 'Performance',
//                 categories: ['Good', 'Warning', 'Danger'],
//                 data: [90, 5, 5],
//                 color: colors[0]
//             }
//         }, {
//             y: 33.33,
//             color: colors[1],
//             drilldown: {
//                 name: 'Events',
//                 categories: ['Good', 'Warning', 'Danger'],
//                 data: [80, 12, 8],
//                 color: colors[1]
//             }
//         }, {
//             y: 33.33,
//             color: colors[2],
//             drilldown: {
//                 name: 'Metrics',
//                 categories: ['Good', 'Warning', 'Danger'],
//                 data: [94, 4, 2],
//                 color: colors[2]
//             }
//         }];
//         let categoryData = [];
//         let valuesData = [];
//         let i, j, dataLen = initData.length, drillDataLen;


// // Build the data arrays
// for (i = 0; i < dataLen; i += 1) {

//     // add browser data
//     categoryData.push({
//         name: catValues[i],
//         y: initData[i].y,
//         color: initData[i].color
//     });

//     // add version data
//     drillDataLen = initData[i].drilldown.data.length;
//     for (j = 0; j < drillDataLen; j += 1) {
//         valuesData.push({
//             name: initData[i].drilldown.categories[j],
//             y: initData[i].drilldown.data[j],
//             color: localColors[j]
//         });
//     }
// }
//         this.app1Chart = new Chart({
//             chart: {
//                 type: 'pie'
//             },
//             title: {
//                 text: 'Application 1'
//             },
//             subtitle: {
//                 text: 'Click to visit the App Dashboard'
//             },
//             yAxis: {
//                 title: {
//                     text: 'Total percent market share'
//                 }
//             },
//             plotOptions: {
//                 pie: {
//                     shadow: false,
//                     center: ['50%', '50%']
//                 }
//             },
//             tooltip: {
//                 valueSuffix: '%'
//             },
//             series: [{
//                 name: 'Categories',
//                 data: categoryData,
//                 size: '60%',
//                 // dataLabels: {
//                 //     formatter: function () {
//                 //         return this.y > 5 ? this.point.name : null;
//                 //     },
//                 //     color: '#ffffff',
//                 //     distance: -30
//                 // }
//             }, {
//                 name: 'Values',
//                 data: valuesData,
//                 size: '80%',
//                 innerSize: '60%',
//                 // dataLabels: {
//                 //     formatter: function () {
//                 //         // display only if larger than 1
//                 //         return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
//                 //             this.y + '%' : null;
//                 //     }
//                 // },
//                 id: 'versions'
//             }],

//         });
//     }
    redirect(app:any){ 
        console.log(app);
        this.router.navigate(["/appDashboard/"+app.appName]);

    }

}