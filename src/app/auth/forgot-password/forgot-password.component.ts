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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
    });
  }

  onSubmit() {
    const formData = this.forgotPassForm.value;
    const data = {
      email: formData.email,
    };

    this.authService.verifyForgotPass(data).subscribe();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.forgotPassForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.forgotPassForm.get(controlName);
    return control?.valid;
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.forgotPassForm.get(controlName);
    return control?.errors?.[errorName];
  }
}
