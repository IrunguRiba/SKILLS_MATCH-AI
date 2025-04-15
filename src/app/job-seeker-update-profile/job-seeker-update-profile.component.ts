import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-seeker-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-seeker-update-profile.component.html',
  styleUrls: ['./job-seeker-update-profile.component.css']
})
export class JobSeekerUpdateProfileComponent {
  profileForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: [''],
      dob: [''],
      profileImage: [''],

      country: [''],
      state: [''],
      city: [''],
      zip: [''],

      qualification: [''],
      institution: [''],
      fieldOfStudy: [''],
      graduationYear: [''],

      jobTitle: [''],
      company: [''],
      experienceYears: [''],
      skills: [''],

      resume: [''],
      linkedin: [''],
      portfolio: ['']
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.submitted = true;
      this.profileForm.disable(); 

    }
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ [controlName]: file.name });
    }
  }
  
}
