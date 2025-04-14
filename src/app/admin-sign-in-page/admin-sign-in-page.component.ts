import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sign-in-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-sign-in-page.component.html',
  styleUrls: ['./admin-sign-in-page.component.css']
})
export class AdminSignInPageComponent{
  form = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
