import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-zd]{8,}$')],
      ],
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

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.registerForm.get(controlName);
    return control?.valid;
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control?.errors?.[errorName];
  }
}
