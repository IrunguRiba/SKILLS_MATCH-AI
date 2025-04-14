import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSignInComponent } from './recruiter-sign-in.component';

describe('RecruiterSignInComponent', () => {
  let component: RecruiterSignInComponent;
  let fixture: ComponentFixture<RecruiterSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterSignInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
