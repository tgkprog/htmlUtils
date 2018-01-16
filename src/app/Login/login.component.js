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
var authentication_service_1 = require("./../services/authentication.service");
var alert_service_1 = require("./../services/alert.service");
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, this.model.profile)
            .subscribe(function (data) {
            console.log(data);
            console.log(_this.returnUrl);
            if (data == "Access Denied") {
                _this.alertService.error("Access Denied!! Invalid Credentials. Please try again", true);
                _this.loading = false;
                return;
            }
            if (data.role == "admin") {
                _this.router.navigate(["/superDashboard"]);
            }
            else {
                if (data.role.includes(_this.model.profile)) {
                    console.log("Profile matches");
                    _this.router.navigate(["/appDashboard/" + _this.model.profile]);
                }
                else {
                    console.log("Profile Mismatch!!");
                    _this.alertService.error("You do not have access to " + _this.model.profile + " Application. Redirecting...", true);
                    _this.router.navigate(["/appDashboard/" + data.role.split(",")[0]]);
                }
            }
            // else{
            //     this.router.navigate([this.returnUrl]);
            // }
        }, function (error) {
            _this.alertService.error(error, true);
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map