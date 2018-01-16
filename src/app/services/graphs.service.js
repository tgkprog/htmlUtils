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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var GraphService = (function () {
    function GraphService(http) {
        this.http = http;
        this.baseUrl = "http://172.22.204.160:8080/applications/";
        this.newDate = new Date();
        this.today = this.newDate.getFullYear() + "-" + (this.newDate.getMonth() + 1) + "-" + this.newDate.getDate();
        this.queryParam = "?beginDate=" + this.today + "&endDate=" + this.today;
    }
    GraphService.prototype.getSuperData = function () {
        return this.http.get("./app/superData.json")
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getConcurrentUsers = function (applName) {
        // To-Do: get AppCode for corresponding ApplName;
        var appCode = "9999";
        if (applName == "app1") {
            appCode = "1000";
        }
        else if (applName == "app2") {
            appCode = "1001";
        }
        else if (applName == "app3") {
            appCode = "1002";
        }
        return this.http.get(this.baseUrl + appCode + "/concurrentUsers" + this.queryParam)
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getUsers = function (applName) {
        // To-Do: get AppCode for corresponding ApplName;
        var appCode = "1000";
        return this.http.get("./app/data2.json")
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getTransactions = function (applName) {
        // To-Do: get AppCode for corresponding ApplName;
        var appCode;
        if (applName == "app1") {
            appCode = "1000";
        }
        else if (applName == "app2") {
            appCode = "1001";
        }
        else if (applName == "app3") {
            appCode = "1002";
        }
        return this.http.get(this.baseUrl + appCode + "/transactions" + this.queryParam)
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getFailedTransactions = function (applName) {
        // To-Do: get AppCode for corresponding ApplName;
        var appCode;
        var status;
        if (applName == "app1") {
            appCode = "1000";
            status = "1";
        }
        else if (applName == "app2") {
            appCode = "1001";
            status = "2";
        }
        else if (applName == "app3") {
            appCode = "1002";
            status = "3";
        }
        return this.http.get(this.baseUrl + appCode + "/failedTransactions/" + status + "/" + this.queryParam)
            .map(function (res) { return res.json(); });
    };
    GraphService.prototype.getTransDetails = function (applName, context) {
        // To-Do: get AppCode for corresponding ApplName;
        var appCode;
        if (applName == "app1") {
            appCode = "1000";
        }
        else if (applName == "app2") {
            appCode = "1001";
        }
        else if (applName == "app3") {
            appCode = "1002";
        }
        return this.http.get("./app/transData.json")
            .map(function (res) { return res.json(); });
    };
    return GraphService;
}());
GraphService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GraphService);
exports.GraphService = GraphService;
//# sourceMappingURL=graphs.service.js.map