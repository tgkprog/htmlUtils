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
var authentication_service_1 = require("../services/authentication.service");
var AdminGuard = (function () {
    function AdminGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log("Logged in user");
            if (this.authService.isAdmin()) {
                console.log("admin!!!");
                return true;
            }
            else {
                console.log("Not admin!!!");
                this.router.navigate(['/error/You do have permissions to view Admin page']);
                return false;
            }
        }
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map