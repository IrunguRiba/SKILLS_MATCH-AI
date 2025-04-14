import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLandingPageComponent } from './recruiter-landing-page.component';

describe('RecruiterLandingPageComponent', () => {
  let component: RecruiterLandingPageComponent;
  let fixture: ComponentFixture<RecruiterLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
