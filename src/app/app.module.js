"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // <-- ngModel lives here
var http_1 = require("@angular/http");
var angular_highcharts_1 = require("angular-highcharts");
var app_routing_module_1 = require("./app-routing.module");
var aboutus_component_1 = require("./aboutus/aboutus-component");
// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header-component");
var login_component_1 = require("./Login/login.component");
var superDashboard_component_1 = require("./superDashboard/superDashboard.component");
var graphs_component_1 = require("./graphs/graphs-component");
var jvm_graphs_component_1 = require("./jvm-graphs/jvm-graphs-component");
var highChart_component_1 = require("./highChart/highChart-component");
var submenu_component_1 = require("./submenu/submenu.component");
var application_component_1 = require("./applications/application-component");
var main_component_1 = require("./main/main-component");
var alert_component_1 = require("./alert/alert.component");
var error_component_1 = require("./error/error.component");
var dialog_component_1 = require("./dialog/dialog.component");
var graphs_service_1 = require("./services/graphs.service");
var authentication_service_1 = require("./services/authentication.service");
var alert_service_1 = require("./services/alert.service");
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var ng2_nvd3_1 = require("ng2-nvd3");
require("highcharts");
require("d3");
require("nvd3");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            angular_highcharts_1.ChartModule
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            login_component_1.LoginComponent,
            superDashboard_component_1.SuperDashboardComponent,
            ng2_nvd3_1.nvD3,
            graphs_component_1.GraphsComponent,
            jvm_graphs_component_1.JVMGraphsComponent,
            highChart_component_1.HighChartComponent,
            submenu_component_1.SubmenuComponent,
            application_component_1.ApplicationsComponent,
            main_component_1.MainComponent,
            aboutus_component_1.AboutusComponent,
            alert_component_1.AlertComponent,
            error_component_1.ErrorComponent,
            dialog_component_1.DialogComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            admin_guard_1.AdminGuard,
            graphs_service_1.GraphService,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map