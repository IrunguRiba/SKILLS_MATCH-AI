import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerLandingPageMyFilesComponent } from './job-seeker-landing-page-my-files.component';

describe('JobSeekerLandingPageMyFilesComponent', () => {
  let component: JobSeekerLandingPageMyFilesComponent;
  let fixture: ComponentFixture<JobSeekerLandingPageMyFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerLandingPageMyFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerLandingPageMyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
