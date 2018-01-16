import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; // <-- ng router

import { MainComponent } from './main/main-component';
import { AboutusComponent } from './aboutus/aboutus-component';
import { LoginComponent } from './Login/login.component';
import { AuthGuard} from './guards/auth.guard';
import { AdminGuard} from './guards/admin.guard';
import { ErrorComponent } from './error/error.component';
import { SuperDashboardComponent } from './superDashboard/superDashboard.component';

const routes: Routes = [
  //  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
   // { path: 'dashboard', component: DashboardComponent },
  //  { path: 'detail/:id', component: HeroDetailComponent },
    //Change/ create authguard for admin and app related
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'superDashboard', component: SuperDashboardComponent, canActivate: [AdminGuard] },
    { path: 'appDashboard/:id', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'app2/:id', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'error/:message', component: ErrorComponent },
    { path: '**', redirectTo:'' }
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }