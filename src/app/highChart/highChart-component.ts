import {Component, Input} from '@angular/core';
import { Chart } from 'angular-highcharts';
import {custData} from './data';
import { GraphService} from '../services/graphs.service';
declare var require: any;
const Highcharts = require('highcharts');

@Component({
  selector: 'highChart-component',
  styleUrls: [
	    './highChart-component.css'
	  ],
  templateUrl: './highChart-component.html'
})
export class HighChartComponent {
  @Input() applName: string;
  userChart: any;
  transChart: any;
  failedTransChart: any;
  transPieChart: any;
  showDialog:boolean = false;
  failedTransDetails:any;
  
  constructor(private graphservice:GraphService){

  }
  ngOnInit() {
    Highcharts.setOptions({
      global: {useUTC: false},
      colors: ['#50B432', '#ED361B', '#DDDD00', '#24CBE5', '#E465B2', '#FF9655', '#FFF263', '#6AF9C4']
    });
    if(this.applName == undefined){
      this.applName = "app1";
    }
    this.graphservice.getConcurrentUsers(this.applName).subscribe(data => {this.initUserGraph(data); }, error => console.log(error));
    this.graphservice.getTransactions(this.applName).subscribe(data => {this.initTransGraph(data); }, error => console.log(error));
    this.graphservice.getFailedTransactions(this.applName).subscribe(data => {this.initFailedTransGraph(data); }, error => console.log(error));
    this.initTransPieGraph();
    
  }
  ngOnChanges(){
    //to do
    this.graphservice.getConcurrentUsers(this.applName).subscribe(data => {this.initUserGraph(data); }, error => console.log(error));
    this.graphservice.getTransactions(this.applName).subscribe(data => {this.initTransGraph(data); }, error => console.log(error));
    this.graphservice.getFailedTransactions(this.applName).subscribe(data => {this.initFailedTransGraph(data); }, error => console.log(error));
    this.initTransPieGraph();
  }

  initUserGraph(dataFromService){
    let finalData = [];
    for(let d of dataFromService){
      let data = [new Date(d.time),d.userCount];
      finalData.push(data);
    }
    this.userChart = new Chart({
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
      colors : Highcharts.getOptions().colors[3],
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
  }

  initTransGraph(dataFromService){
    let finalData = [];
    let startDate:Date = new Date (dataFromService[0].time);
    let nextDate:Date = new Date(dataFromService[1].time);
    let diff:any = nextDate.getTime()-startDate.getTime();
    for(let d of dataFromService){
      let data = [d.transCount];
      finalData.push(data);
    }
    this.transChart = new Chart({
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
      colors : Highcharts.getOptions().colors[0],
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
      // series: [{
      //   type: 'area',
      //   name: 'Line 1',
      //   data: finalData//custData //finalData
      // }]
    });
  }

  initFailedTransGraph(dataFromService){
    let finalData = [];
    let startDate:Date = new Date (dataFromService[0].time);
    let nextDate:Date = new Date(dataFromService[1].time);
    let diff = nextDate.getTime()-startDate.getTime();
    for(let d of dataFromService){
      let data = [d.transCount];
      finalData.push(data);
    }
    let selfContext = this;
    console.log(selfContext);
    let failedTransDetails = function(context):any{
      selfContext.getTransDetails(context);
      //selfContext.showDialog = true;
    }
    this.failedTransChart = new Chart({
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
      colors : Highcharts.getOptions().colors[1],
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
          point : {
            events:{
              click: function():any{
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
      // series: [{
      //   type: 'area',
      //   data: finalData
      // }]
    });
  }

  getTransDetails(context:any){
    this.graphservice.getTransDetails(this.applName, context).subscribe(
      data => {
        this.showDialog = true;
        console.log(context);
        this.failedTransDetails = data;
        console.log(data);
      }, error => console.log(error));
  }

  initTransPieGraph(){
    let data;
    if(this.applName=="app1"){
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
    else if(this.applName=="app2"){
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
    else if(this.applName == "app3"){
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
          }]
    }
    this.transPieChart = new Chart({
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          marginBottom:30,
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
  }
  

  // chart = new Chart({
  //     chart: {
  //       type: 'line'
  //     },
  //     title: {
  //       text: 'Linechart'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [{
  //       name: 'Line 1',
  //       data: [1, 2, 3]
  //     }]
  //   });
  
  // // add point to chart serie
  // add() {
  //   this.chart.addPoint(Math.floor(Math.random() * 10));
  // }
}