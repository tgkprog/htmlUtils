import { Injectable  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GraphService{
    private baseUrl:string = "http://172.22.204.160:8080/applications/";
    private newDate:Date = new Date();
    private today:string = this.newDate.getFullYear()+"-"+(this.newDate.getMonth()+1)+"-"+this.newDate.getDate();
    private queryParam: string = "?beginDate="+this.today+"&endDate="+this.today;
    constructor(private http:Http){

    }

    public getSuperData(){
        return this.http.get("./app/superData.json")
                .map((res:any) => res.json());
    }

    public getConcurrentUsers(applName:string): Observable<any>{
        // To-Do: get AppCode for corresponding ApplName;
        let appCode:string ="9999";
        if(applName=="app1"){
            appCode = "1000";
        }else if(applName=="app2"){
            appCode = "1001";
        }else if(applName=="app3"){
            appCode = "1002";
        }
        return this.http.get(this.baseUrl+appCode+"/concurrentUsers"+this.queryParam)
                .map((res:any) => res.json());
    }
    public getUsers(applName:string): Observable<any>{
        // To-Do: get AppCode for corresponding ApplName;
        let appCode = "1000";
        return this.http.get("./app/data2.json")
                .map((res:any) => res.json());
    }
    public getTransactions(applName:string): Observable<any>{
        // To-Do: get AppCode for corresponding ApplName;
        let appCode:string;
        if(applName=="app1"){
            appCode = "1000";
        }else if(applName=="app2"){
            appCode = "1001";
        }else if(applName=="app3"){
            appCode = "1002";
        }
        return this.http.get(this.baseUrl+appCode+"/transactions"+this.queryParam)
                .map((res:any) => res.json());
    }
    public getFailedTransactions(applName:string): Observable<any>{
        // To-Do: get AppCode for corresponding ApplName;
        let appCode:string;
        let status:string;
        if(applName=="app1"){
            appCode = "1000";
            status="1";
        }else if(applName=="app2"){
            appCode = "1001";
            status="2";
        }else if(applName=="app3"){
            appCode = "1002";
            status="3";
        }
        return this.http.get(this.baseUrl+appCode+"/failedTransactions/"+status+"/"+this.queryParam)
                .map((res:any) => res.json());
    }
    public getTransDetails(applName:string, context:any): Observable<any>{
        // To-Do: get AppCode for corresponding ApplName;
        let appCode:string;
        if(applName=="app1"){
            appCode = "1000";
        }else if(applName=="app2"){
            appCode = "1001";
        }else if(applName=="app3"){
            appCode = "1002";
        }
        return this.http.get("./app/transData.json")
                .map((res:any) => res.json());
    }

}