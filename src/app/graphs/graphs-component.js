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
var graphs_service_1 = require("../services/graphs.service");
var GraphsComponent = (function () {
    function GraphsComponent(graphService) {
        this.graphService = graphService;
        this.title = 'Charts';
    }
    GraphsComponent.prototype.ngOnInit = function () {
        if (this.applName == undefined) {
            this.applName = "FA";
        }
        this.initUserGraph();
        this.initTransactionGraph();
        this.initFailedTransactionGraph();
        this.initTransactionPieChart();
    };
    GraphsComponent.prototype.ngOnChanges = function () {
    };
    GraphsComponent.prototype.initTransactionPieChart = function () {
        this.transactionPieChart_type = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 40
                },
                legend: {
                    margin: {
                        top: 5,
                        right: 20,
                        bottom: 5,
                        left: 20
                    }
                }
            }
        };
        this.transactionPieChart_data = this.transPieChartData(this.applName);
    };
    GraphsComponent.prototype.initUserGraph = function () {
        var _this = this;
        this.userGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 40
                },
                legendPosition: "top",
                legend: {
                    margin: {
                        right: 50
                    }
                },
                //x: function(d){return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);}, for local stub
                //y: function(d){return d.value;}, for local stub
                x: function (d) { return d3.time.format('%Y-%m-%d %H:%M').parse(d.time); },
                y: function (d) { return d.userCount; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'No of Users',
                    axisLabelDistance: -20
                },
                callback: function (chart) {
                    console.log("!!! User Graph callback !!!");
                }
            }
        };
        this.graphService.getConcurrentUsers(this.applName).subscribe(function (data) { _this.setUserData(data); }, function (error) { return console.log(error); });
        //-------------------------hard coded data-------------------------------------
        // this.userGraph_data = this.initUserGraphData(this.applName);
        // //Map all xValues for each dataset to an array (tmp)
        // let tmp = this.userGraph_data.map(function(e) {
        //     return e.values.map(function(d){
        //         return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);
        //     });
        // });
        // //And flatten out that array, so you have all your xValues in a 1D-array
        // let xValues = [].concat.apply([], tmp);
        // this.userGraph_options.chart.xAxis.tickValues =xValues;
        //-------------------------hard coded data ends-------------------------------------
    };
    GraphsComponent.prototype.setUserData = function (dataFromService) {
        var dataValues = this.filterUserData(dataFromService);
        //let dataValues = dataFromService;
        //console.log(dataValues);
        this.userGraph_data = [
            {
                key: "Concurrent users",
                color: '#000080',
                area: true,
                values: dataValues
            }
        ];
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.userGraph_data.map(function (e) {
            return e.values.map(function (d) {
                if ((d.time).endsWith("00")) {
                    return d3.time.format('%Y-%m-%d %H:%M').parse(d.time);
                }
                else {
                    return null;
                }
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.userGraph_options.chart.xAxis.tickValues = xValues;
    };
    GraphsComponent.prototype.filterUserData = function (data) {
        //to-do filter the data
        var startTime = new Date();
        startTime.setHours(9, 0, 0, 0);
        var endTime = new Date();
        endTime.setHours(17, 0, 0, 0);
        var wantedData = data.filter(function (i) {
            var thisDate = new Date(i.time);
            return (startTime <= thisDate && thisDate <= endTime);
        });
        return wantedData;
    };
    GraphsComponent.prototype.initTransactionGraph = function () {
        this.transGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 40
                },
                legend: {
                    margin: {
                        right: 50
                    }
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.time); },
                y: function (d) { return d.value; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'No of User Operations',
                    axisLabelDistance: -20
                },
                callback: function (chart) {
                    console.log("!!! Transaction Graph callback !!!");
                }
            }
        };
        this.transGraph_data = this.initTransGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.transGraph_data.map(function (e) {
            return e.values.map(function (d) {
                return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.transGraph_options.chart.xAxis.tickValues = xValues;
    };
    GraphsComponent.prototype.initFailedTransactionGraph = function () {
        this.failedTransGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 40
                },
                legend: {
                    margin: {
                        right: 50
                    }
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.time); },
                y: function (d) { return d.value; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'No of Failed User Operations',
                    axisLabelDistance: -20
                },
                callback: function (chart) {
                    console.log("!!! Failed Transaction Graph callback !!!");
                }
            }
        };
        this.failedTransGraph_data = this.initFailedTransGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.failedTransGraph_data.map(function (e) {
            return e.values.map(function (d) {
                return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.failedTransGraph_options.chart.xAxis.tickValues = xValues;
    };
    // To Retrieve the Pie Chart pieChartData
    GraphsComponent.prototype.transPieChartData = function (applName) {
        if (applName == "FA") {
            return [
                {
                    key: "Sales",
                    y: 4
                },
                {
                    key: "Purchases",
                    y: 5
                },
                {
                    key: "Payments",
                    y: 3
                },
                {
                    key: "Deposits",
                    y: 1
                },
                {
                    key: "Withdrawls",
                    y: 2
                },
                {
                    key: "Funds Transfer",
                    y: 9
                }
            ];
        }
        else if (applName == "Portfolio") {
            return [
                {
                    key: "Sales",
                    y: 3
                },
                {
                    key: "Purchases",
                    y: 5
                },
                {
                    key: "Payments",
                    y: 6
                },
                {
                    key: "Deposits",
                    y: 5
                },
                {
                    key: "Withdrawls",
                    y: 3
                },
                {
                    key: "Funds Transfer",
                    y: 2
                }
            ];
        }
        else if (applName == "Fee Schedule") {
            return [
                {
                    key: "Sales",
                    y: 4
                },
                {
                    key: "Purchases",
                    y: 4
                },
                {
                    key: "Payments",
                    y: 4
                },
                {
                    key: "Deposits",
                    y: 4
                },
                {
                    key: "Withdrawls",
                    y: 4
                },
                {
                    key: "Funds Transfer",
                    y: 4
                }
            ];
        }
    };
    GraphsComponent.prototype.initUserGraphData = function (applName) {
        if (applName == "FA") {
            return [
                {
                    key: "Concurrent users",
                    color: '#000080',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 55
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 80
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 70
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 65
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 25
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 55
                        }
                    ]
                }
            ];
        }
        else if (applName == "Portfolio") {
            return [
                {
                    key: "Concurrent users",
                    color: '#000080',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 20
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 35
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 70
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 65
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 45
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 55
                        }
                    ]
                }
            ];
        }
        else if (applName == "Fee Schedule") {
            return [
                {
                    key: "Concurrent users",
                    color: '#000080',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 105
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 95
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 100
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 90
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 85
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 65
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 65
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 85
                        }
                    ]
                }
            ];
        }
    };
    GraphsComponent.prototype.initTransGraphData = function (applName) {
        if (applName == "FA") {
            return [
                {
                    key: "User Operations",
                    color: '#66CD00',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 45
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 30
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 45
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 30
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 15
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 20
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 15
                        }
                    ]
                }
            ];
        }
        else if (applName == "Portfolio") {
            return [
                {
                    key: "User Operations",
                    color: '#66CD00',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 20
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 35
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 35
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 40
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 30
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 15
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 35
                        }
                    ]
                }
            ];
        }
        else if (applName == "Fee Schedule") {
            return [
                {
                    key: "User Operations",
                    color: '#66CD00',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 80
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 75
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 80
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 75
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 50
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 20
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 35
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 45
                        }
                    ]
                }
            ];
        }
    };
    GraphsComponent.prototype.initFailedTransGraphData = function (applName) {
        if (applName == "FA") {
            return [
                {
                    key: " Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 12
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 8
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 20
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 16
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 12
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 0
                        }
                    ]
                }
            ];
        }
        else if (applName == "Portfolio") {
            return [
                {
                    key: "Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 8
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 6
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 12
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 5
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 5
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 0
                        }
                    ]
                }
            ];
        }
        else if (applName == "Fee Schedule") {
            return [
                {
                    key: "Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                        {
                            "time": "29-11-2017 11:00",
                            "value": 8
                        },
                        {
                            "time": "29-11-2017 11:15",
                            "value": 7
                        },
                        {
                            "time": "29-11-2017 11:30",
                            "value": 8
                        },
                        {
                            "time": "29-11-2017 11:45",
                            "value": 5
                        },
                        {
                            "time": "29-11-2017 12:00",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 12:15",
                            "value": 0
                        },
                        {
                            "time": "29-11-2017 12:30",
                            "value": 5
                        },
                        {
                            "time": "29-11-2017 12:45",
                            "value": 4
                        }
                    ]
                }
            ];
        }
    };
    return GraphsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GraphsComponent.prototype, "applName", void 0);
GraphsComponent = __decorate([
    core_1.Component({
        selector: 'graphs-component',
        templateUrl: './graphs-component.html',
        styleUrls: [
            '../../../node_modules/nvd3/build/nv.d3.css',
            './graphs-component.css'
        ]
    }),
    __metadata("design:paramtypes", [graphs_service_1.GraphService])
], GraphsComponent);
exports.GraphsComponent = GraphsComponent;
//# sourceMappingURL=graphs-component.js.map