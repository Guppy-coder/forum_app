import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { LandingpageComponent } from './app/components/landingpage/landingpage.component';
import { RegistrationComponent } from './app/components/registration/registration.component';
import { HomeComponent } from './app/components/homepage/homepage.component';
import { PostComponent } from './app/components/post/post.component';
import { CommentPageComponent } from './app/components/comment-page/comment-page.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: LandingpageComponent },
      { path: 'login', component: LoginComponent },
      {path: 'signup', component: RegistrationComponent},
      {path: 'dashboard', component: HomeComponent},
      {path: 'post', component: PostComponent},
      {path: 'questions/:id', component: CommentPageComponent},

    ])
  ]
});