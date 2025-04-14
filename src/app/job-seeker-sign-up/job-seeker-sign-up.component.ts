import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-seeker-sign-up',
  standalone: true,
  templateUrl: './job-seeker-sign-up.component.html',
  styleUrls: ['./job-seeker-sign-up.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ]
})
export class JobSeekerSignUpComponent 
{ form = new FormGroup({ firstName: new FormControl('', [Validators.required]), 
lastName: new FormControl('', [Validators.required, Validators.minLength(1)]), 
email: new FormControl('', [Validators.required, Validators.email]), 
password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
city: new FormControl(''), state: new FormControl(''), 
isAgree: new FormControl(true) }); 
onSubmit() { if (this.form.valid)
   { console.log(this.form.value); } 
else { console.log('Form is invalid'); } } }