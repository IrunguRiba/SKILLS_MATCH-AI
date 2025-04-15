import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerLandingPageNotificationsComponent } from './job-seeker-landing-page-notifications.component';

describe('JobSeekerLandingPageNotificationsComponent', () => {
  let component: JobSeekerLandingPageNotificationsComponent;
  let fixture: ComponentFixture<JobSeekerLandingPageNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerLandingPageNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerLandingPageNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
