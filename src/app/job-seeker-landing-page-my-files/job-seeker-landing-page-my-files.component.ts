import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CustomFile {
  name: string;
  size: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-job-seeker-landing-page-my-files',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-seeker-landing-page-my-files.component.html',
  styleUrls: ['./job-seeker-landing-page-my-files.component.css']
})
export class JobSeekerLandingPageMyFilesComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  files: CustomFile[] = [];
  selectedFile!: File;
  showForm: boolean = false;

  fileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fileForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  triggerFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.showForm = true;
    }
  }

  submitFile(): void {
    if (this.fileForm.invalid || !this.selectedFile) return;

    const { title, description } = this.fileForm.value;

    const newFile: CustomFile = {
      name: this.selectedFile.name,
      size: this.selectedFile.size,
      title,
      description
    };

    this.files.push(newFile);

    // Reset everything
    this.fileForm.reset();
    this.selectedFile = undefined as any;
    this.showForm = false;
    this.fileInputRef.nativeElement.value = '';
  }

  cancelUpload(): void {
    this.fileForm.reset();
    this.selectedFile = undefined as any;
    this.showForm = false;
    this.fileInputRef.nativeElement.value = '';
  }

  deleteFile(fileToDelete: CustomFile): void {
    this.files = this.files.filter(file => file !== fileToDelete);
  }
}
