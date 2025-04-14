import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSignUpComponent } from './recruiter-sign-up.component';

describe('RecruiterSignUpComponent', () => {
  let component: RecruiterSignUpComponent;
  let fixture: ComponentFixture<RecruiterSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
