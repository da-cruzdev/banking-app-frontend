import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/shared/constants/global-constants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  responseMessage!: any;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkPolitics: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    const formData = this.registerForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      checkPolitics: formData.checkPolitics,
    };

    this.authService.signUp(data).subscribe();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  public isControlInvalidAndUntouched(
    controlName: string,
    errorKey?: string
  ): boolean {
    const control = this.registerForm.get(controlName);
    const errors = control?.errors;

    return (
      control?.touched &&
      control?.dirty &&
      control?.invalid &&
      (errorKey ? errors?.[errorKey] : true)
    );
  }
}
