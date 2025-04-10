import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
