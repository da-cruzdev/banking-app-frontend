import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage!: any;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password,
    };

    this.authService.login(data).subscribe();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.valid;
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control?.errors?.[errorName];
  }
}
