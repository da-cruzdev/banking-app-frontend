import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LOGIN } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage!: any;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private readonly store: Store) {}

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

    this.store.dispatch(LOGIN({ payload: data }));
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
