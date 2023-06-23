import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  hasError,
  isMisMatchPassword,
  validatePassword,
} from 'src/app/shared/constants/validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetPassForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetPassForm = this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-zd]{8,}$')],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: validatePassword }
    );
  }

  onSubmit() {
    const formData = this.resetPassForm.value;

    const data = {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const token = localStorage.getItem('token');
    if (token) this.authService.resetPassword(data, token).subscribe();
  }

  hasError(controlName: string, errorKey: string): boolean {
    return hasError(this.resetPassForm, controlName, errorKey);
  }

  get isMisMatchPassword(): boolean {
    const value = isMisMatchPassword(this.resetPassForm);
    return value;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.resetPassForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.resetPassForm.get(controlName);
    return control?.valid;
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.resetPassForm.get(controlName);
    return control?.errors?.[errorName];
  }
}
