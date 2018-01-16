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
var authentication_service_1 = require("../services/authentication.service");
var router_1 = require("@angular/router");
var HeaderComponent = (function () {
    function HeaderComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.appList = [];
        this.showDropDown = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem("currentUser"));
        this.multiAppAccess = Boolean(localStorage.getItem("multiAppAccess"));
        if (this.multiAppAccess && this.user) {
            var roles = this.user.role;
            if (roles == "admin") {
                this.appList.push("superDashboard");
                this.appList.push("app1");
                this.appList.push("app2");
                this.appList.push("app3");
                this.appList.push("app4");
            }
            else {
                for (var _i = 0, _a = (roles.split(",")); _i < _a.length; _i++) {
                    var app = _a[_i];
                    this.appList.push(app);
                }
            }
        }
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this.user = JSON.parse(localStorage.getItem("currentUser"));
        this.multiAppAccess = Boolean(localStorage.getItem("multiAppAccess"));
        if (this.multiAppAccess && this.user && this.appList.length == 0) {
            var roles = this.user.role;
            if (roles == "admin") {
                this.appList.push("superDashboard");
                this.appList.push("app1");
                this.appList.push("app2");
                this.appList.push("app3");
                this.appList.push("app4");
            }
            else {
                for (var _i = 0, _a = (roles.split(",")); _i < _a.length; _i++) {
                    var app = _a[_i];
                    this.appList.push(app);
                }
            }
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.appList = [];
        this.authService.logout();
        this.router.navigate(["/login"]);
    };
    HeaderComponent.prototype.redirect = function (app) {
        if (app == "superDashboard") {
            this.router.navigate(["/" + app]);
        }
        else {
            this.router.navigate(["/appDashboard/" + app]);
        }
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'header-component',
        templateUrl: './header-component.html',
        styleUrls: ['./header-component.css'],
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        router_1.Router])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header-component.js.map