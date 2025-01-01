import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService,private router:Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    const formData = this.signupForm.value;
    // console.log('Form Data:', formData);
    if (this.signupForm.valid) {
      // console.log('Signup Form Data:', this.signupForm.value);
      alert('Signup successful!');
    } else {
      alert('Please fill out the form correctly.');
    }
    const hashedPassword = CryptoJS.SHA256(formData.password).toString();

    const payload={
      name:formData.name,
      email:formData.email,
      password:hashedPassword
    }
    
    this.loginService.signup(payload.name,payload.email,payload.password).subscribe((res:any)=>{
      if(res.message=='User created successfully'){
        this.router.navigate(['/login']);
      }
    })
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
    localStorage.setItem('userLoggingIn', 'true');
  }
}
