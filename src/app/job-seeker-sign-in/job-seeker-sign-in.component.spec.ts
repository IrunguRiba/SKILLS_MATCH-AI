import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerSignInComponent } from './job-seeker-sign-in.component';

describe('RecruiterSignInComponent', () => {
  let component: JobSeekerSignInComponent;
  let fixture: ComponentFixture<JobSeekerSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
