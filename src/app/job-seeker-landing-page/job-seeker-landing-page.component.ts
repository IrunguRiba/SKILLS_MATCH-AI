import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-seeker-landing-page',
  templateUrl: './job-seeker-landing-page.component.html',
  styleUrls: ['./job-seeker-landing-page.component.css'],
  imports: [CommonModule] 
})
export class JobSeekerLandingPageComponent {
  menuExpanded: boolean = false;

  logoImage: string = 'BackgroundImg.png'; 
  userProfile: string = 'user.png'; 

  toggleMenu(): void {
    this.menuExpanded = !this.menuExpanded;
  }
}
