import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';  // Add RouterModule here

@Component({
  selector: 'app-recruiter-sign-up',
  standalone: true,
  templateUrl: './recruiter-sign-up.component.html',
  styleUrls: ['./recruiter-sign-up.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,  // Ensure RouterModule is imported here
  ],
})
export class RecruiterSignUpComponent {
  form = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    companyLocation: new FormControl('', [Validators.required]),
    isAgree: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
