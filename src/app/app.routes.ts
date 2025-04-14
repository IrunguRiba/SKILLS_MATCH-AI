import { Routes } from '@angular/router';
import { JobSeekerSignUpComponent } from './job-seeker-sign-up/job-seeker-sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecruiterLandingPageComponent } from './recruiter-landing-page/recruiter-landing-page.component';
import { RecruiterSignUpComponent } from './recruiter-sign-up/recruiter-sign-up.component';
import { RecruiterSignInComponent } from './recruiter-sign-in/recruiter-sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { JobSeekerSignInComponent } from './job-seeker-sign-in/job-seeker-sign-in.component';
import { AdminSignInPageComponent } from './admin-sign-in-page/admin-sign-in-page.component';

export const routes: Routes = [
  {
    path: '',
    component:LandingPageComponent
  },
  {
path:'jobSeeker',
component:JobSeekerSignUpComponent
  },
 {
  path:'recruiterSignUp',
  component:RecruiterSignUpComponent
 },
 {
  path:'jobSeekerSignIn',
  component:JobSeekerSignInComponent
 },
 {
  path:'recruiterSignIn',
  component:RecruiterSignInComponent
 },
 {
  path:'recruiterLandingPage',
  component:RecruiterLandingPageComponent
 },
 {
  path:'forgotPassword',
 component:ForgotPasswordComponent
 },
 {
  path:'adminPage',
  component:AdminSignInPageComponent
 }
];
