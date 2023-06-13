import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPassForm!: FormGroup;
  responseMessage!: any;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.forgotPassForm.value;
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
    const control = this.forgotPassForm.get(controlName);
    const errors = control?.errors;

    return (
      control?.touched &&
      control?.dirty &&
      control?.invalid &&
      (errorKey ? errors?.[errorKey] : true)
    );
  }
}
