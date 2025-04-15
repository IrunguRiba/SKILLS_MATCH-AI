import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerUpdateProfileComponent } from './job-seeker-update-profile.component';

describe('JobSeekerUpdateProfileComponent', () => {
  let component: JobSeekerUpdateProfileComponent;
  let fixture: ComponentFixture<JobSeekerUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerUpdateProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
