"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var graphs_service_1 = require("../services/graphs.service");
var Highcharts = require('highcharts');
var SuperDashboardComponent = (function () {
    function SuperDashboardComponent(route, router, graphService) {
        this.route = route;
        this.router = router;
        this.graphService = graphService;
    }
    SuperDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showTooltip = false;
        //this.graphService.getSuperData().subscribe(data => this.setInitData(data), error => console.log(error));
        this.graphService.getSuperData().subscribe(function (data) { _this.applist = data; }, function (error) { return console.log(error); });
    };
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
    SuperDashboardComponent.prototype.redirect = function (app) {
        console.log(app);
        this.router.navigate(["/appDashboard/" + app.appName]);
    };
    return SuperDashboardComponent;
}());
SuperDashboardComponent = __decorate([
    core_1.Component({
        selector: 'superDashboard',
        templateUrl: './superDashboard.component.html',
        styleUrls: ['./superDashboard.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, graphs_service_1.GraphService])
], SuperDashboardComponent);
exports.SuperDashboardComponent = SuperDashboardComponent;
//# sourceMappingURL=superDashboard.component.js.map