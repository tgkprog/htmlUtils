import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit,Input, Injectable  } from '@angular/core';
import { GraphService} from '../services/graphs.service';
import * as D3 from "d3";
declare let d3: any;

@Component({
	selector: 'graphs-component',
	templateUrl: './graphs-component.html',
	styleUrls: [
	    '../../../node_modules/nvd3/build/nv.d3.css',
	    './graphs-component.css'
	  ]
})
export class GraphsComponent {
  @Input() applName: string;
  title = 'Charts';
  userGraph_options;
  userGraph_data;
  transGraph_options;
  transGraph_data;
  failedTransGraph_options;
  failedTransGraph_data;
  transactionPieChart_type;
  transactionPieChart_data;
  pieChart_type;
  pieChart_data;

  constructor(private graphService:GraphService){

  }

  ngOnInit() {
    if(this.applName == undefined){
        this.applName = "FA";
    }
    this.initUserGraph();
    this.initTransactionGraph();
    this.initFailedTransactionGraph();
    this.initTransactionPieChart();
    
  }

  ngOnChanges(){
      
  }
  
  initTransactionPieChart(){
    this.transactionPieChart_type = {
            chart: {
                type:'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                margin : {
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

}

  initUserGraph(){
    this.userGraph_options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
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
        x: function(d){return d3.time.format('%Y-%m-%d %H:%M').parse(d.time);}, // for service call
        y: function(d){return d.userCount;}, // for service call
        useInteractiveGuideline: true,
        dispatch: {
            stateChange: function(e){ console.log("stateChange"); },
            changeState: function(e){ console.log("changeState"); },
            tooltipShow: function(e){ console.log("tooltipShow"); },
            tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function(d){
              return d3.time.format('%H:%M')(new Date(d));
          }
        },
        yAxis: {
          axisLabel: 'No of Users',
          axisLabelDistance: -20
        },
        callback: function(chart){
            console.log("!!! User Graph callback !!!");
        }
      }
    }
    this.graphService.getConcurrentUsers(this.applName).subscribe(data => {this.setUserData(data); }, error => console.log(error));
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
  }

  setUserData(dataFromService){
    let dataValues = this.filterUserData(dataFromService);
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
    let tmp = this.userGraph_data.map(function(e) {
        return e.values.map(function(d){
            if((d.time).endsWith("00")){
                return d3.time.format('%Y-%m-%d %H:%M').parse(d.time);
            }
             else{
                 return null;
             }
        });
    });
    //And flatten out that array, so you have all your xValues in a 1D-array
    let xValues = [].concat.apply([], tmp);
    this.userGraph_options.chart.xAxis.tickValues =xValues;
  }

  filterUserData(data){
    //to-do filter the data
    let startTime = new Date();
    startTime.setHours(9,0,0,0);
    let endTime = new Date();
    endTime.setHours(17,0,0,0);

    let wantedData = data.filter(function(i){
        let thisDate = new Date(i.time);
        return (startTime<=thisDate && thisDate<=endTime);
    });
    return wantedData;
  }

  initTransactionGraph(){
      this.transGraph_options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
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
            x: function(d){return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);},
            y: function(d){return d.value;},
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
            axisLabel: 'Time',
            tickFormat: function(d){
                return d3.time.format('%H:%M')(new Date(d));
            }
            },
            yAxis: {
            axisLabel: 'No of User Operations',
            axisLabelDistance: -20
            },
            callback: function(chart){
                console.log("!!! Transaction Graph callback !!!");
            }
        }
      }
        this.transGraph_data = this.initTransGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        let tmp = this.transGraph_data.map(function(e) {
            return e.values.map(function(d) {
                return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);
            });    
        });
    //And flatten out that array, so you have all your xValues in a 1D-array
    let xValues = [].concat.apply([], tmp);
    this.transGraph_options.chart.xAxis.tickValues =xValues;
  }

  initFailedTransactionGraph(){
      this.failedTransGraph_options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
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
            x: function(d){return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);},
            y: function(d){return d.value;},
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
            axisLabel: 'Time',
            tickFormat: function(d){
                return d3.time.format('%H:%M')(new Date(d));
            }
            },
            yAxis: {
            axisLabel: 'No of Failed User Operations',
            axisLabelDistance: -20
            },
            callback: function(chart){
                console.log("!!! Failed Transaction Graph callback !!!");
            }
        }
      }
        this.failedTransGraph_data = this.initFailedTransGraphData(this.applName);
        //Map all xValues for each dataset to an array (tmp)
        let tmp = this.failedTransGraph_data.map(function(e) {
            return e.values.map(function(d) {
                return d3.time.format('%d-%m-%Y %H:%M').parse(d.time);
            });    
        });
    //And flatten out that array, so you have all your xValues in a 1D-array
    let xValues = [].concat.apply([], tmp);
    this.failedTransGraph_options.chart.xAxis.tickValues =xValues;
  }


// To Retrieve the Pie Chart pieChartData
transPieChartData(applName:string){
    if(applName == "FA"){
        return  [
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
    }else if(applName == "Portfolio"){
        return  [
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
    }else if(applName == "Fee Schedule"){
        return  [
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
 
}

initUserGraphData(applName:string){
    if(applName=="FA"){
        return [
            {
                key: "Concurrent users",
                color: '#000080',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 55
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 80
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 70
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 65
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 25
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 55
            }
            ]
        }
        ];
    } else if(applName=="Portfolio"){
        return [
            {
                key: "Concurrent users",
                color: '#000080',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 20
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 35
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 70
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 65
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 45
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 55
            }
            ]
        }
        ];

    }else if(applName=="Fee Schedule") {
        return [
            {
                key: "Concurrent users",
                color: '#000080',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 105
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 95
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 100
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 90
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 85
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 65
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 65
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 85
            }
            ]
        }
        ];
    }
}
initTransGraphData(applName:string){
    if(applName=="FA"){
        return [
            {
                key: "User Operations",
                color: '#66CD00',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 45
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 30
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 45
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 30
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 15
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 20
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 15
            }
            ]
        }
        ];
    } else if(applName=="Portfolio"){
        return [
            {
                key: "User Operations",
                color: '#66CD00',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 0
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 20
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 35
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 35
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 40
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 30
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 15
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 35
            }
            ]
        }
        ];

    }else if(applName=="Fee Schedule") {
        return [
            {
                key: "User Operations",
                color: '#66CD00',
                area: true,
                values: [
            {
                "time" : "29-11-2017 11:00" ,
                "value" : 80
            } ,
            {
                "time" : "29-11-2017 11:15" ,
                "value" : 75
            } ,
            {
                "time" : "29-11-2017 11:30" ,
                "value" : 80
            } ,
            {
                "time" : "29-11-2017 11:45" ,
                "value" : 75
            } ,
            {
                "time" : "29-11-2017 12:00" ,
                "value" : 50
            } ,
            {
                "time" : "29-11-2017 12:15" ,
                "value" : 20
            } ,
            {
                "time" : "29-11-2017 12:30" ,
                "value" : 35
            } ,
            {
                "time" : "29-11-2017 12:45" ,
                "value" : 45
            }
            ]
        }
        ];
    }
}
    initFailedTransGraphData(applName:string){
        if(applName=="FA"){
            return [
                {
                    key: " Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                {
                    "time" : "29-11-2017 11:00" ,
                    "value" : 12
                } ,
                {
                    "time" : "29-11-2017 11:15" ,
                    "value" : 8
                } ,
                {
                    "time" : "29-11-2017 11:30" ,
                    "value" : 20
                } ,
                {
                    "time" : "29-11-2017 11:45" ,
                    "value" : 16
                } ,
                {
                    "time" : "29-11-2017 12:00" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 12:15" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 12:30" ,
                    "value" : 12
                } ,
                {
                    "time" : "29-11-2017 12:45" ,
                    "value" : 0
                }
                ]
            }
            ];
        } else if(applName=="Portfolio"){
            return [
                {
                    key: "Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                {
                    "time" : "29-11-2017 11:00" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 11:15" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 11:30" ,
                    "value" : 8
                } ,
                {
                    "time" : "29-11-2017 11:45" ,
                    "value" : 6
                } ,
                {
                    "time" : "29-11-2017 12:00" ,
                    "value" : 12
                } ,
                {
                    "time" : "29-11-2017 12:15" ,
                    "value" : 5
                } ,
                {
                    "time" : "29-11-2017 12:30" ,
                    "value" : 5
                } ,
                {
                    "time" : "29-11-2017 12:45" ,
                    "value" : 0
                }
                ]
            }
            ];

        }else if(applName=="Fee Schedule") {
            return [
                {
                    key: "Failed User Operations",
                    color: '#cc2222',
                    area: true,
                    values: [
                {
                    "time" : "29-11-2017 11:00" ,
                    "value" : 8
                } ,
                {
                    "time" : "29-11-2017 11:15" ,
                    "value" : 7
                } ,
                {
                    "time" : "29-11-2017 11:30" ,
                    "value" : 8
                } ,
                {
                    "time" : "29-11-2017 11:45" ,
                    "value" : 5
                } ,
                {
                    "time" : "29-11-2017 12:00" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 12:15" ,
                    "value" : 0
                } ,
                {
                    "time" : "29-11-2017 12:30" ,
                    "value" : 5
                } ,
                {
                    "time" : "29-11-2017 12:45" ,
                    "value" : 4
                }
                ]
            }
            ];
        }
    }
}