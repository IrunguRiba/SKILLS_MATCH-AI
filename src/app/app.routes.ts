import { Routes } from '@angular/router';
import { JobSeekerSignUpComponent } from './job-seeker-sign-up/job-seeker-sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecruiterLandingPageComponent } from './recruiter-landing-page/recruiter-landing-page.component';
import { RecruiterSignUpComponent } from './recruiter-sign-up/recruiter-sign-up.component';
import { RecruiterSignInComponent } from './recruiter-sign-in/recruiter-sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { JobSeekerSignInComponent } from './job-seeker-sign-in/job-seeker-sign-in.component';
import { AdminSignInPageComponent } from './admin-sign-in-page/admin-sign-in-page.component';
import { JobSeekerLandingPageComponent } from './job-seeker-landing-page/job-seeker-landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AskAiComponent } from './ask-ai/ask-ai.component';
import { JobSeekerLandingPageNotificationsComponent } from './job-seeker-landing-page-notifications/job-seeker-landing-page-notifications.component';
import { JobSeekerLandingPageMyFilesComponent } from './job-seeker-landing-page-my-files/job-seeker-landing-page-my-files.component';
import { JobSeekerUpdateProfileComponent } from './job-seeker-update-profile/job-seeker-update-profile.component';

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
 },
 {
  path:'jobSeekerLandingPage',
  component:JobSeekerLandingPageComponent
 }, 
 {
  path:'adminLandingPage',
  component:AdminPageComponent
 },
 {
  path:'jobSeekerLandingPage',
  component:JobSeekerLandingPageComponent
 },
 {
  path:'askAi',
  component:AskAiComponent
 },
{
  path:'jobSeekerNotifications',
  component:JobSeekerLandingPageNotificationsComponent
},
{
  path:'jobSeekerLandingPageMyfiles',
  component:JobSeekerLandingPageMyFilesComponent
},
{
  path:'jobSeekerUpdateProfile',
  component:JobSeekerUpdateProfileComponent
}
];
