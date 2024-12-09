import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false; 
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],  
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;

      console.log('Request payload:', { email, password });

      this.signupService.login({ email, password }).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            const token = response.token;
            console.log('Login successful:', response);
            localStorage.setItem('jwtToken', token);  
            this.router.navigate(['/todo']);  
          } else {
            console.error('Token not found in response');
            this.errorMessage = 'Unexpected error. Please try again.';
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
