import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-seeker-sign-in',
  standalone: true,
  templateUrl: './job-seeker-sign-in.component.html',
  styleUrls: ['./job-seeker-sign-in.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ]
})
export class JobSeekerSignInComponent {
  form = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
