import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: LandingpageComponent},
];
