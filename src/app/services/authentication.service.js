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
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password, userProfile) {
        this.profile = userProfile;
        return this.http.get("./app/loginData.json")
            .map(function (users) {
            console.log(users.json());
            var userList = users.json();
            // store user details in local storage to keep user logged in between page refreshes
            for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
                var user = userList_1[_i];
                if (username == user.username && password == user.password) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if (user.role.split(",").length > 1 || user.role == "admin") {
                        localStorage.setItem("multiAppAccess", "true");
                    }
                    return user;
                }
            }
            return "Access Denied";
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem("multiAppAccess");
    };
    AuthenticationService.prototype.isAdmin = function () {
        if (JSON.parse(localStorage.getItem('currentUser')).role == "admin") {
            return true;
        }
        return false;
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map