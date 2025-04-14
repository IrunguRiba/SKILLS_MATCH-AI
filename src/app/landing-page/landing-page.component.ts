import { Component } from '@angular/core';
import { JobSeekerSignUpComponent } from '../job-seeker-sign-up/job-seeker-sign-up.component';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  imports:[RouterModule, RouterLink],
  standalone: true,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',  
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  adminImg:string='admin.png'
  logoImage: string = 'BackgroundImg.png';
  jobSeekerSignUplinkImage: string = 'share.png';
  jobSeekerSignInlinkImage: string = 'share.png';
  recruiterSignUplinkImage: string = 'share.png';
  recruiterSignInlinkImage: string = 'share.png';
  faqImg: string = 'faq.png';
  resourceImage: string = 'team.png';
  supportImage: string = 'help-desk.png';
  testimonialsImage: string = 'review.png';
  privacyImage: string = 'privacy-policy.png';
}
