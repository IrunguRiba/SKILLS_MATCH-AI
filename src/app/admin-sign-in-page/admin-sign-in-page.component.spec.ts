import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignInPageComponent } from './admin-sign-in-page.component';

describe('AdminSignInPageComponent', () => {
  let component: AdminSignInPageComponent;
  let fixture: ComponentFixture<AdminSignInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSignInPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
