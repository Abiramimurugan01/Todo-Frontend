import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm!: FormGroup;
  submitted = false;
  newEmail: string = '';
  newPassword: string = '';
  newName: string = '';
  public items: { id: any, email: string, password: string,name: string }[] = [];

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  ngOnInit(): void {
    this.signForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        c_password: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

 
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('c_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get formControls() {
    return this.signForm.controls;
  }

 
  call() {
    this.submitted = true;
    if (this.signForm.valid) {
      console.log('Form Data:',this.signForm.value);
      this.signupService.insertDetail(this.signForm.value).subscribe(
        response => {
          console.log('Signup successful:', response);
          this.signForm.reset(); 
        },
        error => {
          console.error('Signup failed:', error);
          if (error.status === 422) {
            console.log('Validation errors:', error.error.errors);
          }
          
        }
      );
    }else {
      console.log('Form is invalid');
    }
  
  }

 
  insertDetail() {
    if (this.newEmail.trim() !== '' && this.newPassword.trim() !== ''&& this.newName.trim() !== '') {
      this.signupService.insertDetail({ email: this.newEmail, password: this.newPassword,name: this.newName }).subscribe(() => {
        this.newEmail = '';
        this.newPassword = '';
        this.newName = '';
      });
    }
  }
}

