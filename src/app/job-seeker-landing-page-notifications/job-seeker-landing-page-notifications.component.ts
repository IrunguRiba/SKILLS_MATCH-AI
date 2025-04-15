import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngFor, *ngIf, etc.

@Component({
  standalone: true,
  selector: 'app-job-seeker-landing-page-notifications',
  templateUrl: './job-seeker-landing-page-notifications.component.html',
  styleUrls: ['./job-seeker-landing-page-notifications.component.css'],
  imports: [CommonModule] 
})
export class JobSeekerLandingPageNotificationsComponent {
  notifications = [
    {
      title: 'Internship',
      message: 'We are Delighted to inform you...',
      time: '2 mins ago'
    },
    {
      title: 'Skills_Match AI',
      message: 'We updated our AI model. Check it out!',
      time: '10 hours ago'
    },
    {
      title: 'PayLess',
      message: 'We are Delighted to inform you...',
      time: '1 day ago'
    }
  ];
}
