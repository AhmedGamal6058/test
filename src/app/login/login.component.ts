import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormManagerService } from '../services/form-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userForm!: FormGroup;
  hidePassword = true;
  lang_key: string = localStorage.getItem('lang_key') || 'en';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public formManager: FormManagerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      platform: ['web'],
      language: ['en'],
      noti_registrationId: ['123412341234'],
    });
  }

  loginUser() {
    const formData = this.formManager.getFormData(this.userForm.value);
    this.authService.login(formData).subscribe(
      (res: any) => {
        if (res.status == true) {
          localStorage.setItem('token', res.user_data.token);
          localStorage.setItem('user_username', res.user_data.user_username);
          localStorage.setItem('user_email', res.user_data.user_email);
          localStorage.setItem('user_phone', res.user_data.user_phone);
          this.router.navigate(['/dashboard']);
        } else {
          console.log(res);
        }
      },
      (err) => console.error(err)
    );
  }
}
