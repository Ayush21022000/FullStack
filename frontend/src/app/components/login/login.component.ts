import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import * as CryptoJS from 'crypto-js'; //used to hash password

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      alert('Login successful!');
    } else {
      alert('Please fill out the form correctly.');
    }
    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
    
    const payload={
      email:formData.email,
      password:hashedPassword
    }
   this.loginService.login(payload.email,hashedPassword).subscribe((res:any)=>{
    if(res.message=='Login successful'){
      localStorage.setItem('isUserLoggedIn', 'true');
      this.router.navigate(['/products']);
    }else{
      alert('Login failed!');
    }
   })
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
