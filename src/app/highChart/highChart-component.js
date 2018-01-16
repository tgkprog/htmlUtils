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
var angular_highcharts_1 = require("angular-highcharts");
var graphs_service_1 = require("../services/graphs.service");
var Highcharts = require('highcharts');
var HighChartComponent = (function () {
    function HighChartComponent(graphservice) {
        this.graphservice = graphservice;
        this.showDialog = false;
    }
    HighChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        Highcharts.setOptions({
            global: { useUTC: false },
            colors: ['#50B432', '#ED361B', '#DDDD00', '#24CBE5', '#E465B2', '#FF9655', '#FFF263', '#6AF9C4']
        });
        if (this.applName == undefined) {
            this.applName = "app1";
        }
        this.graphservice.getConcurrentUsers(this.applName).subscribe(function (data) { _this.initUserGraph(data); }, function (error) { return console.log(error); });
        this.graphservice.getTransactions(this.applName).subscribe(function (data) { _this.initTransGraph(data); }, function (error) { return console.log(error); });
        this.graphservice.getFailedTransactions(this.applName).subscribe(function (data) { _this.initFailedTransGraph(data); }, function (error) { return console.log(error); });
        this.initTransPieGraph();
    };
    HighChartComponent.prototype.ngOnChanges = function () {
        var _this = this;
        //to do
        this.graphservice.getConcurrentUsers(this.applName).subscribe(function (data) { _this.initUserGraph(data); }, function (error) { return console.log(error); });
        this.graphservice.getTransactions(this.applName).subscribe(function (data) { _this.initTransGraph(data); }, function (error) { return console.log(error); });
        this.graphservice.getFailedTransactions(this.applName).subscribe(function (data) { _this.initFailedTransGraph(data); }, function (error) { return console.log(error); });
        this.initTransPieGraph();
    };
    HighChartComponent.prototype.initUserGraph = function (dataFromService) {
        var finalData = [];
        for (var _i = 0, dataFromService_1 = dataFromService; _i < dataFromService_1.length; _i++) {
            var d = dataFromService_1[_i];
            var data = [new Date(d.time), d.userCount];
            finalData.push(data);
        }
        this.userChart = new angular_highcharts_1.Chart({
            chart: {
                zoomType: 'x',
                marginBottom: 55
            },
            title: {
                text: 'Concurrent Users'
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Users'
                }
            },
            legend: {
                enabled: false
            },
            colors: Highcharts.getOptions().colors[3],
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[3]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2,
                        fillColor: Highcharts.getOptions().colors[3]
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            // series: [{
            //   type: 'area',
            //   data: finalData
            //   pointStart: ,
            //   pointInterval: 3600 * 1000 // one hour - configurable
            // }]
            series: [{
                    type: 'area',
                    name: 'Line 2',
                    data: finalData
                }]
        });
    };
    HighChartComponent.prototype.initTransGraph = function (dataFromService) {
        var finalData = [];
        var startDate = new Date(dataFromService[0].time);
        var nextDate = new Date(dataFromService[1].time);
        var diff = nextDate.getTime() - startDate.getTime();
        for (var _i = 0, dataFromService_2 = dataFromService; _i < dataFromService_2.length; _i++) {
            var d = dataFromService_2[_i];
            var data = [d.transCount];
            finalData.push(data);
        }
        this.transChart = new angular_highcharts_1.Chart({
            chart: {
                zoomType: 'x',
                marginBottom: 55
            },
            title: {
                text: 'Transaction Distribution'
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Transactions Count'
                }
            },
            legend: {
                enabled: false
            },
            colors: Highcharts.getOptions().colors[0],
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2,
                        fillColor: Highcharts.getOptions().colors[0]
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                series: {
                    cursor: 'pointer',
                    pointStart: startDate.getTime(),
                    pointInterval: diff // in milliseconds - configurable
                }
            },
            series: [{
                    type: 'area',
                    data: finalData
                }]
        });
    };
    HighChartComponent.prototype.initFailedTransGraph = function (dataFromService) {
        var finalData = [];
        var startDate = new Date(dataFromService[0].time);
        var nextDate = new Date(dataFromService[1].time);
        var diff = nextDate.getTime() - startDate.getTime();
        for (var _i = 0, dataFromService_3 = dataFromService; _i < dataFromService_3.length; _i++) {
            var d = dataFromService_3[_i];
            var data = [d.transCount];
            finalData.push(data);
        }
        var selfContext = this;
        console.log(selfContext);
        var failedTransDetails = function (context) {
            selfContext.getTransDetails(context);
            //selfContext.showDialog = true;
        };
        this.failedTransChart = new angular_highcharts_1.Chart({
            chart: {
                zoomType: 'x',
                marginBottom: 55
            },
            title: {
                text: 'Failed Transaction Distribution'
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Failed Transactions Count'
                }
            },
            legend: {
                enabled: false
            },
            colors: Highcharts.getOptions().colors[1],
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[1]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2,
                        fillColor: Highcharts.getOptions().colors[1]
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                failedTransDetails(this);
                            }
                        }
                    },
                    pointStart: startDate.getTime(),
                    pointInterval: diff //in milliseconds
                }
            },
            series: [{
                    type: 'area',
                    data: finalData
                }]
        });
    };
    HighChartComponent.prototype.getTransDetails = function (context) {
        var _this = this;
        this.graphservice.getTransDetails(this.applName, context).subscribe(function (data) {
            _this.showDialog = true;
            console.log(context);
            _this.failedTransDetails = data;
            console.log(data);
        }, function (error) { return console.log(error); });
    };
    HighChartComponent.prototype.initTransPieGraph = function () {
        var data;
        if (this.applName == "app1") {
            data = [{
                    name: 'Sales',
                    y: 56
                }, {
                    name: 'Purchases',
                    y: 24,
                }, {
                    name: 'Payments',
                    y: 10
                }, {
                    name: 'Deposits',
                    y: 4
                }, {
                    name: 'Withdrawls',
                    y: 9
                }, {
                    name: 'Funds Transfer',
                    y: 34
                }];
        }
        else if (this.applName == "app2") {
            data = [{
                    name: 'Sales',
                    y: 34
                }, {
                    name: 'Purchases',
                    y: 14,
                }, {
                    name: 'Payments',
                    y: 34
                }, {
                    name: 'Deposits',
                    y: 30
                }, {
                    name: 'Withdrawls',
                    y: 31
                }, {
                    name: 'Funds Transfer',
                    y: 14
                }];
        }
        else if (this.applName == "app3") {
            data = [{
                    name: 'Sales',
                    y: 12
                }, {
                    name: 'Purchases',
                    y: 14,
                }, {
                    name: 'Payments',
                    y: 40
                }, {
                    name: 'Deposits',
                    y: 54
                }, {
                    name: 'Withdrawls',
                    y: 39
                }, {
                    name: 'Funds Transfer',
                    y: 4
                }];
        }
        this.transPieChart = new angular_highcharts_1.Chart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                marginBottom: 30,
                type: 'pie'
            },
            title: {
                text: 'Transactions Type Spread'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor)
                        }
                    }
                }
            },
            series: [{
                    name: 'Transactions',
                    //colorByPoint: true,
                    data: data
                }]
        });
    };
    return HighChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HighChartComponent.prototype, "applName", void 0);
HighChartComponent = __decorate([
    core_1.Component({
        selector: 'highChart-component',
        styleUrls: [
            './highChart-component.css'
        ],
        templateUrl: './highChart-component.html'
    }),
    __metadata("design:paramtypes", [graphs_service_1.GraphService])
], HighChartComponent);
exports.HighChartComponent = HighChartComponent;
//# sourceMappingURL=highChart-component.js.map