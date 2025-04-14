import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerSignUpComponent } from './job-seeker-sign-up.component';

describe('JobSeekerSignUpComponent', () => {
  let component: JobSeekerSignUpComponent;
  let fixture: ComponentFixture<JobSeekerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
