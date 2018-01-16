"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router"); // <-- ng router
var main_component_1 = require("./main/main-component");
var aboutus_component_1 = require("./aboutus/aboutus-component");
var login_component_1 = require("./Login/login.component");
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var error_component_1 = require("./error/error.component");
var superDashboard_component_1 = require("./superDashboard/superDashboard.component");
var routes = [
    //  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'dashboard', component: DashboardComponent },
    //  { path: 'detail/:id', component: HeroDetailComponent },
    //Change/ create authguard for admin and app related
    { path: '', component: login_component_1.LoginComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'superDashboard', component: superDashboard_component_1.SuperDashboardComponent, canActivate: [admin_guard_1.AdminGuard] },
    { path: 'appDashboard/:id', component: main_component_1.MainComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'app2/:id', component: main_component_1.MainComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'aboutus', component: aboutus_component_1.AboutusComponent },
    { path: 'error/:message', component: error_component_1.ErrorComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map