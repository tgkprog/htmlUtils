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
var common_1 = require("@angular/common");
var ApplicationsComponent = (function () {
    function ApplicationsComponent(route, location) {
        this.route = route;
        this.location = location;
        this.zonedate = Date.now();
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        this.curUsers = 89;
        this.transactions = 195;
        this.failedTrans = 67;
        this.timestamp = new Date();
        this.getAppId();
        if (this.applName == undefined) {
            this.applName = decodeURI(this.location.path().split('/').pop()) || "FA";
            console.log("after reset: " + this.applName);
        }
    };
    ApplicationsComponent.prototype.appChanged = function (event) {
        if (event.target.textContent.trim() !== "More") {
            this.applName = event.target.textContent;
            console.log(event.target.textContent);
        }
    };
    ApplicationsComponent.prototype.getAppId = function () {
        var appName = +this.route.snapshot.paramMap.get('appId');
        //console.log(this.route.params);
    };
    return ApplicationsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ApplicationsComponent.prototype, "applName", void 0);
ApplicationsComponent = __decorate([
    core_1.Component({
        selector: 'app-applications-component',
        templateUrl: './application-component.html',
        styleUrls: ['./application-component.css'],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location])
], ApplicationsComponent);
exports.ApplicationsComponent = ApplicationsComponent;
//# sourceMappingURL=application-component.js.map