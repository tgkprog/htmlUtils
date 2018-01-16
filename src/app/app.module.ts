import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- ngModel lives here
import { HttpModule } from "@angular/http";
import { ChartModule } from 'angular-highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AboutusComponent } from './aboutus/aboutus-component';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header-component';
import { LoginComponent } from './Login/login.component';
import { SuperDashboardComponent } from './superDashboard/superDashboard.component';
import { GraphsComponent } from './graphs/graphs-component';
import { JVMGraphsComponent } from './jvm-graphs/jvm-graphs-component';
import { HighChartComponent } from './highChart/highChart-component';
import { SubmenuComponent } from './submenu/submenu.component';
import { ApplicationsComponent } from './applications/application-component';
import { MainComponent } from './main/main-component';
import { AlertComponent } from './alert/alert.component';
import { ErrorComponent } from './error/error.component';
import { DialogComponent } from './dialog/dialog.component';

import {GraphService} from './services/graphs.service';
import {AuthenticationService} from './services/authentication.service';
import {AlertService} from './services/alert.service';
import { AuthGuard} from './guards/auth.guard';
import { AdminGuard} from './guards/admin.guard';

import { nvD3 } from 'ng2-nvd3';
import 'highcharts';
import 'd3';
import 'nvd3';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModule)]
    HttpModule,
    AppRoutingModule,
    ChartModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SuperDashboardComponent,
    nvD3,
    GraphsComponent,
    JVMGraphsComponent,
    HighChartComponent,
    SubmenuComponent,
    ApplicationsComponent,
    MainComponent,
    AboutusComponent,
    AlertComponent,
    ErrorComponent,
    DialogComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    GraphService,
    AlertService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
