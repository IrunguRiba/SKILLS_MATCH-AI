import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiter-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recruiter-sign-up.component.html',
  styleUrls: ['./recruiter-sign-up.component.css']
})
export class RecruiterSignUpComponent {
  form = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   companyLocation: new FormControl('', [Validators.required]),
    isAgree: new FormControl(false, Validators.requiredTrue)
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
