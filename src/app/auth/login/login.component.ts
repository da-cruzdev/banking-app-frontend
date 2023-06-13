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
      email: ['', [Validators.required, Validators.email]],
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

  public isControlInvalidAndUntouched(
    controlName: string,
    errorKey?: string
  ): boolean {
    const control = this.loginForm.get(controlName);
    const errors = control?.errors;

    return (
      control?.touched &&
      control?.dirty &&
      control?.invalid &&
      (errorKey ? errors?.[errorKey] : true)
    );
  }
}
