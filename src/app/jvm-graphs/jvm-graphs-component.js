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
var JVMGraphsComponent = (function () {
    function JVMGraphsComponent() {
        this.title = 'Charts';
    }
    JVMGraphsComponent.prototype.ngOnInit = function () {
        if (this.applName == undefined) {
            this.applName = "app1";
        }
        this.initHeapMemoryGraph();
        this.initThreadGraph();
        this.initCpuGraph();
        this.initGbcGraph();
    };
    JVMGraphsComponent.prototype.ngOnChanges = function () {
        this.initHeapMemoryGraph();
        this.initThreadGraph();
        this.initCpuGraph();
        this.initGbcGraph();
    };
    JVMGraphsComponent.prototype.initHeapMemoryGraph = function () {
        this.memoryGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.x); },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time ',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Memory (Mb)',
                    tickFormat: function (d) {
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: -3
                },
                callback: function (chart) {
                    console.log("!!! Heap Memory graph callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Heap Memory Usage'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        this.memoryGraph_data = this.heapMemoryGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.memoryGraph_data.map(function (e) {
            return e.values.map(function (d) {
                if ((d.x).endsWith("0")) {
                    return d3.time.format('%d-%m-%Y %H:%M').parse(d.x);
                }
                else {
                    return null;
                }
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.memoryGraph_options.chart.xAxis.tickValues = xValues;
    };
    JVMGraphsComponent.prototype.initThreadGraph = function () {
        this.threadGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.x); },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time ',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'No of Threads',
                    tickFormat: function (d) {
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: -3
                },
                callback: function (chart) {
                    console.log("!!! Thread graph callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Thread Count'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        this.threadGraph_data = this.threadGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.threadGraph_data.map(function (e) {
            return e.values.map(function (d) {
                if ((d.x).endsWith("0")) {
                    return d3.time.format('%d-%m-%Y %H:%M').parse(d.x);
                }
                else {
                    return null;
                }
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.threadGraph_options.chart.xAxis.tickValues = xValues;
    };
    JVMGraphsComponent.prototype.initCpuGraph = function () {
        this.cpuGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.x); },
                y: function (d) { return d.y; },
                yDomain: [0, 100],
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time ',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'CPU Usage in %',
                    tickFormat: function (d) {
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function (chart) {
                    console.log("!!! CPU graph callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'CPU Usage'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        this.cpuGraph_data = this.cpuGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.cpuGraph_data.map(function (e) {
            return e.values.map(function (d) {
                if ((d.x).endsWith("30") || (d.x).endsWith("00")) {
                    return d3.time.format('%d-%m-%Y %H:%M').parse(d.x);
                }
                else {
                    return null;
                }
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.cpuGraph_options.chart.xAxis.tickValues = xValues;
    };
    JVMGraphsComponent.prototype.initGbcGraph = function () {
        this.gbcGraph_options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d3.time.format('%d-%m-%Y %H:%M').parse(d.x); },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time ',
                    tickFormat: function (d) {
                        return d3.time.format('%H:%M')(new Date(d));
                    }
                },
                yAxis: {
                    axisLabel: 'Memory released',
                    tickFormat: function (d) {
                        return d3.format('.0f')(d);
                    },
                    axisLabelDistance: -3
                },
                callback: function (chart) {
                    console.log("!!! GBC graph callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Garbage collection'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
        this.gbcGraph_data = this.gbcGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        var tmp = this.gbcGraph_data.map(function (e) {
            return e.values.map(function (d) {
                if ((d.x).endsWith("0")) {
                    return d3.time.format('%d-%m-%Y %H:%M').parse(d.x);
                }
                else {
                    return null;
                }
            });
        });
        //And flatten out that array, so you have all your xValues in a 1D-array
        var xValues = [].concat.apply([], tmp);
        this.gbcGraph_options.chart.xAxis.tickValues = xValues;
    };
    JVMGraphsComponent.prototype.heapMemoryGraphData = function (applName) {
        //Line chart data should be sent as an array of series objects.
        if (applName == "app1") {
            return [
                {
                    key: 'Used Heap',
                    color: '#ff7f0e',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 3100
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 3900
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 3750
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 4100
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 4185
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 3855
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 4350
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 4204
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 5251
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 6113
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 5852
                        }],
                    strokeWidth: 2,
                    area: true
                },
                {
                    key: 'Committed Heap',
                    color: '#5588ff',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 6500
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app2") {
            return [
                {
                    key: 'Used Heap',
                    color: '#ff7f0e',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 2100
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 2900
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 3250
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 3100
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 3185
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 2855
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 3350
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 3204
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 4251
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 5113
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 5852
                        }],
                    strokeWidth: 2,
                    area: true
                },
                {
                    key: 'Committed Heap',
                    color: '#5588ff',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 6500
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app3") {
            return [
                {
                    key: 'Used Heap',
                    color: '#ff7f0e',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 5400
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 5300
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 5250
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 5100
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 5185
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 5255
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 5330
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 5804
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 6251
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 6113
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 6052
                        }],
                    strokeWidth: 2,
                    area: true
                },
                {
                    key: 'Committed Heap',
                    color: '#5588ff',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 5500
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 6500
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 6500
                        }],
                    strokeWidth: 2,
                }
            ];
        }
    };
    ;
    JVMGraphsComponent.prototype.threadGraphData = function (applName) {
        //Line chart data should be sent as an array of series objects.
        if (applName == "app1") {
            return [
                {
                    key: 'Thread Count',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 28
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 31
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 24
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 15
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 35
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app2") {
            return [
                {
                    key: 'Thread Count',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 8
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 12
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 24
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 31
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 28
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 28
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 17
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 10
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 26
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 26
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 26
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app3") {
            return [
                {
                    key: 'Thread Count',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 40
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 23
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 15
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 39
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 35
                        }],
                    strokeWidth: 2,
                }
            ];
        }
    };
    ;
    JVMGraphsComponent.prototype.cpuGraphData = function (applName) {
        //Line chart data should be sent as an array of series objects.
        if (applName == "app1") {
            return [
                {
                    key: 'CPU Usage',
                    color: '#4682b4',
                    values: [
                        {
                            "x": "29-11-2017 11:00",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:05",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:10",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 11:20",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:25",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:35",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 11:40",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 11:50",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 11:55",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 12:05",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 12:10",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 33
                        },
                        {
                            "x": "29-11-2017 12:20",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 12:25",
                            "y": 33
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 12:35",
                            "y": 33
                        },
                        {
                            "x": "29-11-2017 12:40",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 12:50",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 12:55",
                            "y": 45
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 47
                        },
                        {
                            "x": "29-11-2017 13:05",
                            "y": 45
                        },
                        {
                            "x": "29-11-2017 13:10",
                            "y": 43
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 44
                        },
                        {
                            "x": "29-11-2017 13:20",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 13:25",
                            "y": 33
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 35
                        }
                    ],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app2") {
            return [
                {
                    key: 'CPU Usage',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 8
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 10
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 10
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 21
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 28
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 15
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 17
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 12
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 16
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 16
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 18
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app3") {
            return [
                {
                    key: 'CPU Usage',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 45
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 58
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 58
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 52
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 56
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 53
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 62
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 55
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 57
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 59
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 65
                        }],
                    strokeWidth: 2,
                }
            ];
        }
    };
    ;
    JVMGraphsComponent.prototype.gbcGraphData = function (applName) {
        //Line chart data should be sent as an array of series objects.
        if (applName == "app1") {
            return [
                {
                    key: 'Freed Memory',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 125
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 31
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 52
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 29
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 34
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 35
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app2") {
            return [
                {
                    key: 'Memory Released',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 0
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 10
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 24
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 31
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 98
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 59
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 35
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 26
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 26
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 22
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 26
                        }],
                    strokeWidth: 2,
                }
            ];
        }
        else if (applName == "app3") {
            return [
                {
                    key: 'Memory Released',
                    color: '#4682b4',
                    values: [{
                            "x": "29-11-2017 11:00",
                            "y": 40
                        },
                        {
                            "x": "29-11-2017 11:15",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 11:30",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 11:45",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 12:00",
                            "y": 36
                        },
                        {
                            "x": "29-11-2017 12:15",
                            "y": 79
                        },
                        {
                            "x": "29-11-2017 12:30",
                            "y": 51
                        },
                        {
                            "x": "29-11-2017 12:45",
                            "y": 25
                        },
                        {
                            "x": "29-11-2017 13:00",
                            "y": 37
                        },
                        {
                            "x": "29-11-2017 13:15",
                            "y": 38
                        },
                        {
                            "x": "29-11-2017 13:30",
                            "y": 32
                        }],
                    strokeWidth: 2,
                }
            ];
        }
    };
    ;
    return JVMGraphsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JVMGraphsComponent.prototype, "applName", void 0);
JVMGraphsComponent = __decorate([
    core_1.Component({
        selector: 'jvm-graphs-component',
        templateUrl: './jvm-graphs-component.html',
        styleUrls: [
            '../../../node_modules/nvd3/build/nv.d3.css',
            './jvm-graphs-component.css'
        ]
    })
], JVMGraphsComponent);
exports.JVMGraphsComponent = JVMGraphsComponent;
//# sourceMappingURL=jvm-graphs-component.js.map