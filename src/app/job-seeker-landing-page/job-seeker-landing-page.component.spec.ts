import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerLandingPageComponent } from './job-seeker-landing-page.component';

describe('JobSeekerLandingPageComponent', () => {
  let component: JobSeekerLandingPageComponent;
  let fixture: ComponentFixture<JobSeekerLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
